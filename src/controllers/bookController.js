const Book = require('../model/book')
const Slot = require('../model/slot')
const { welcomeEmail } = require('../utils/email')
const Features = require('../utils/feature')


/*Create booking Endpoint */
exports.createBook = async (req, res) => {
    const role = req.user.role.toLowerCase()
    if (role == 'organisation') {
        return res.status(404).send('organisation cant book appointment')
    }
    try {
        const _id = req.params.id
        const slot = await Slot.findById(_id)
        const OrganisationName = await slot.populate('owner')


        console.log(slot.available)
        const book = new Book({
            ...req.body,
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            contact: req.user.contact,
            email: req.user.email,
            slot,
            owner: req.user._id,
            organisation: slot.owner
        })

        await book.save()
        await slot.save()
        welcomeEmail(req.user.email, OrganisationName.owner.firstname)
        res.status(201).send({ success: true, data: book })
    } catch (e) {
        console.log(e)
        res.status('500').send("Slot is already booked Please Find another time")

    }
}



exports.getBooks = async (req, res) => {
    console.log(req.user.role)
    if (req.user.role == 'user') {
        return res.status(404).send('users cant view appointment')
    }

    try {
        const features = new Features(Book.find({ organisation: req.user._id }), req.query).sort().paginate().fields().filter()
        const user = await features.query
        res.status(200).send({ success: true, data: user })

    } catch (e) {
        console.log(e)
        return res.status(500).send(e)
    }
}
const Slot = require('../model/slot')
const Features = require('../utils/feature')

exports.addSlot = async (req, res) => {

    const role = req.user.role.toLowerCase()
    if (role == 'client') {
        return res.status(404).send('client cant create slots')
    }

    try {


        const slot = new Slot({ ...req.body, owner: req.user._id })
        await slot.save()

        res.status(201).send({
            success: true,
            data: slot
        })
    } catch (e) {
        res.status(500).send({

            success: false,
            data: e
        })
    }

}


exports.getSlot = async (req, res) => {

    try {
        const _id = req.params.id
        const slot = await Slot.findById(_id)
        if (!slot) { res.status(404).send({ success: false, data: 'Not found' }) }
        res.status(200).send({ success: true, data: slot })

    } catch (e) {
        res.status(500).send({ success: false, data: e })
    }
}

exports.getSlots = async (req, res) => {
    try {

        const features = new Features(Slot.find(), req.query).filter().sort().fields()

        const slot = await features.query

        if (!slot) { res.status(404).send({ success: false, data: 'Not found' }) }
        res.status(200).send({ success: true, count: slot.length, data: slot })

    } catch (e) {
        console.log(e)
        res.status(500).send({ success: false, data: e })
    }
}

exports.updateSlot = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['day', 'date', 'from', 'to']
    isAllowed = updates.every((update) => { return allowedUpdate.includes(update) })

    if (role == 'client') {
        return res.status(404).send('client cant update slots')
    }
    if (!isAllowed) { throw new Error('Invalid field') }
    try {
        const _id = req.params.id
        const slot = await Slot.findById(_id)
        if (!slot) { res.status(404).send({ success: false, msg: 'Not found' }) }
        updates.forEach(update => { slot[update] = req.body[update] });
        await slot.save()
        res.status(200).send({ success: true, data: slot })

    } catch (e) {
        res.status(404).send({ success: false, msg: e })
    }

}

exports.deleteSlot = async (req, res) => {
    if (role == 'client') {
        return res.status(404).send('client cant delete slots')
    }
    try {
        const _id = req.params.id
        const slot = await Slot.findByIdAndDelete(_id)
        if (!slot) { res.status(404).send({ success: false, msg: 'Not found' }) }

        res.status(200).send({ success: true, data: slot })

    } catch (e) {
        res.status(500).send({ success: false, msg: e })
    }
}
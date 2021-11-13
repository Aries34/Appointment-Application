const User = require('../model/user')


// POST -> USER
exports.createUser = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateTokens()
        res.status(201).send({
            success: true,
            data: user,
            token
        })
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}




// POST -> USER
exports.userLogin = async (req, res, next) => {
    try {
        const user = await User.findbyCredentials(req.body.email, req.body.password)
        const token = await user.generateTokens()
        if (!user) {
            res.status(400).send({ success: true, data: "data not found" })
        }
        res.status(200).send({
            success: true,
            data: user,
            token
        })

    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}

// POST -> USER
exports.userLogout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            token.token !== req.token
        })
        await req.user.save()
        res.send(200).send({
            success: true,
            msg: 'user successfully logged out'
        })
    } catch (e) {
        res.status(500).send({
            success: false,
            msg: e
        })
    }
}


// GET -> USER
exports.getUser = async (req, res) => {
    try {

        const user = await req.user
        if (!user) {
            res.status(400).send({ success: true, data: "data not found" })
        }
        res.status(200).send({
            success: true,
            data: user
        })
    } catch (e) {
        res.status(500).send(e)
    }
}


// PATCH -> USER
exports.updateUser = async (req, res, next) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstname', 'lastname', 'contact', 'email']
    isAllowed = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if (!isAllowed) {
        throw new Error('Invalid Field')
    }
    try {

        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.status(200).send({ success: true, data: req.user })
    } catch (e) {

        res.status(500).send({ success: false, data: e })
    }

}


// DELETE -> USER
exports.deleteUser = async (req, res, next) => {
    try {
        await req.user.remove()
        res.status(200).send({ success: true, data: req.user })
    } catch (e) {
        res.status(500).send({ success: false, data: e })
    }



}
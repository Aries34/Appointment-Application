const User = require('../model/user')
const jwt = require('jsonwebtoken')

const userAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET_USER)
        const user = await User.findOne({ '_id': decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error("unable to Authenticate")
        }

        req.user = user
        req.token = token
        next()
    } catch (e) {
        console.log(e)
        res.status(500).send("Please Authenticate")
    }

}



module.exports = userAuth
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




const userSchema = mongoose.Schema({
    firstname: {
        required: true,
        type: String,
        trim: true,
        default: 'Appointment'

    },
    lastname: {
        required: true,
        type: String,
        trim: true,
        default: 'User'
    },
    companyName: {
        required: true,
        type: String,
        trim: true,
        default: 'Company'
    },
    contact: {
        required: true,
        type: String,
        maxlength: 12,
        minlength: 12,
        trim: true
    },
    email: {
        required: true,
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    },
    role: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },

    password: {
        required: true,
        type: String,
        trim: true,
        minlength: 8,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password mst contain password')
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
}, {
    timestamps: true
})


userSchema.methods.toJSON = function () {
    user = this
    userObject = user.toObject()
    delete userObject.tokens
    delete userObject.password
    return userObject
}

userSchema.virtual('slots', {
    'ref': 'Slot',
    'localField': '_id',
    'foreignField': 'owner'
})


userSchema.virtual('books', {
    'ref': 'Slot',
    'localField': '_id',
    'foreignField': 'organisation'
})





userSchema.statics.findbyCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }


    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.methods.generateTokens = async function () {
    const user = this
    const token = jwt.sign({ '_id': user._id.toString() }, process.env.JWT_SECRET_USER)
    user.tokens = user.tokens.concat({ token })
    user.save()
    return token
}

//Password Hashing
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)

    }

    next()

})

const User = mongoose.model('User', userSchema)





module.exports = User
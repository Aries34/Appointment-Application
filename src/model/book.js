const mongoose = require('mongoose')
const validator = require('validator')

const bookSchema = mongoose.Schema({
    firstname: {
        required: true,
        type: String,
        trim: true,

    },
    lastname: {
        required: true,
        type: String,
        trim: true,

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
    contact: {
        required: true,
        type: String,
        maxlength: 12,
        minlength: 12,
        trim: true,

    },

    slot: {
        type: String,
        required: true,
        unique: true,
        trim: true,

    },
    description: {
        type: String,
        trim: true,
        maxlength: 1000
    },
    organisation: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Book = new mongoose.model('Bookings', bookSchema)

module.exports = Book
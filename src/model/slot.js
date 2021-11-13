const mongoose = require('mongoose')

const slotSchema = mongoose.Schema({
    day: {
        required: true,
        type: String,
        trim: true
    },
    date: {
        required: true,
        type: String,
        trim: true
    },
    from: {
        required: true,
        type: String,
        trim: true,

    },
    available: {
        required: true,
        type: String,
        default: true
    },
    to: {
        required: true,
        type: String,
        trim: true,


    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

})





const Slot = mongoose.model('Slot', slotSchema)


module.exports = Slot


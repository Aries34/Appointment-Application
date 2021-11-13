const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/appoinment', { useNewUrlParser: true }, (err) => {
    if (err) {

        console.log(err)
    }

})
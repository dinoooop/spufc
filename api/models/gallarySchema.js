const mongoose = require('mongoose');
const gallarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: false
    },
    photos: {
        type: [String],
        required: false
    }
   
})

module.exports = mongoose.model('gallery', gallarySchema);



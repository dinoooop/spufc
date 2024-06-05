const mongoose = require('mongoose');
const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    enquiry: {
        type: String,
        required: true
    }
   
});

module.exports = mongoose.model('enquiry', enquirySchema);

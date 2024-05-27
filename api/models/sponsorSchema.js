// models/Sponsor.js
const mongoose = require('mongoose');

const SponsorSchema = new mongoose.Schema({
   name: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
     
    },
    logo: {
        type: String,
        required: true
    },
   photos: {
        type: [String], 
        required: true
    },
    type: {
        type: String,
        required: false
    },
    
website: {
    type: String,
    required: false
},
phone: {
    type: String,
    required: false
},
status: {
    type: String,
    default: 1
},
address: {
    type: String,
    required: false
},
email: {
    type: String,
    required: true
},
offers: {
    type: String,
    required: false
},
    
    
   
});





module.exports = mongoose.model('Sponsors', SponsorSchema);

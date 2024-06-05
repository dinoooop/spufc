// models/Sponsor.js
const mongoose = require('mongoose');
// const connectDb = require('../connect');

// connectDb();
const SponsorSchema = new mongoose.Schema({
   name: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
   photos: {
        type: [String], // Assuming the logo will be stored as a Buffer
        required: true
    },
    type: {
        type: String,
        required: true
    },
    
website: {
    type: String,
    required: true
},
phone: {
    type: String,
    required: true
},
status: {
    type: String,
    default: 1
},
address: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true
},
offers: {
    type: String,
    required: true
},
    
    
   
});





module.exports = mongoose.model('Sponsors', SponsorSchema);

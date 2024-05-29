const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    start_at: {
        type: Date,
        default: Date.now
    },
    logo: {
        type: String,
        required: false
    },
    photos: {
        type: [String],
        required: false
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
    email: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    longitude: {
        type: String,
        required: false
    },
    latitude: {
        type: String,
        required: false
    },
 
    offers: {
        type: String,
        required: false
    },
    payment_link: {
        type: String,
        required: false
    }
})
module.exports = mongoose.model('Events', eventSchema);


// map: {
//     type: {
//         type: String,
//         // enum: ['Point'], // 'location.type' must be 'Point'
//         required: false
//     },
//     coordinates: {
//         type: [Number],
//         required: false
//     }
//},
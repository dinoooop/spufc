// models/AboutUs.js
const mongoose = require('mongoose');

const AboutUsSchema = new mongoose.Schema({
    facebookLink: {
    type: String,
    required: false
  },
  instagramLink: {
    type: String,
    required: false
  },
  mailId: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false      
  },
  image: {
    type: String,
    required: false
  },
  heading: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  }
});

// Middleware to enforce single document rule
// AboutUsSchema.pre('save', async function(next) {
//     const docCount = await this.model('AboutUs').countDocuments();
//     if (docCount > 0) {
//       const err = new Error('There can only be one AboutUs document');
//       next(err);
//     } else {
//       next();
//     }
//   });

module.exports = mongoose.model('AboutUs', AboutUsSchema);

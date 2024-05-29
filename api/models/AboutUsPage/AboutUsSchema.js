// models/AboutUs.js
const mongoose = require('mongoose');

const AboutUsSchema = new mongoose.Schema({
    facebook: {
    type: String,
    required: false
  },
  instagram: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false      
  },
  file: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  more: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('AboutUs', AboutUsSchema);

const mongoose = require("mongoose");
require('dotenv').config();

// const connectDB = mongoose.connect('mongodb://127.0.0.1:27017/Admin_123');
// connectDB.then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('Could not connect to MongoDB', err);

// });
const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB connected');
  } catch (err) {
      console.error(err.message);
      process.exit(1); // Exit process with failure
  }
};

module.exports =  connectDB  ;
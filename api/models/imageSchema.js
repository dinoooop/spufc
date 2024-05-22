const mongoose = require('mongoose');
const connectDb = require('../connect');
// const connect = mongoose.connect('mongodb://127.0.0.1:27017/Admin_123');

// connect.then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('Could not connect to MongoDB', err);
// });
connectDb();

const ImageSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Images', ImageSchema);

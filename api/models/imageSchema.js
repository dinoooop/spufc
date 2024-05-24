const mongoose = require('mongoose');
const connectDb = require('../connect');

connectDb();

const ImageSchema = new mongoose.Schema({
    name: {
    type: String,
    required:true
    },
    image:{
        type: String,
        required:true
    },
    Discription:{
        type:String
    }
});

module.exports = mongoose.model('Images', ImageSchema);


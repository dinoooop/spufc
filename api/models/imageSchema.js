const mongoose = require('mongoose');
const connectDb = require('../connect');

connectDb();

// const ImageSchema = new mongoose.Schema({
//     name: String,
//     data: Buffer,
//     contentType: String,
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model('Images', ImageSchema);

const ImageSchema = new mongoose.Schema({
    name: {
    type: String,
    required:true
    },
    image:{
        data:Buffer,
        contentType: String
    },
    Discription:{
        type:String
    }
});

module.exports = mongoose.model('Images', ImageSchema);


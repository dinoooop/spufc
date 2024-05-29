const mongoose = require('mongoose');
 const sustainabilitySchema = new mongoose.Schema({
    title: {
        type : String,
        required: false
    },
    bannar: {
        type : String,
        required: false
    },
    photos: {
        type :String,
        required: false
    },
    discription: {
        type:String,
        required : false
    }
 });
 module.exports = mongoose.model("sustainability",sustainabilitySchema);





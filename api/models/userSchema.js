 const mongoose = require('mongoose');
//  const connectDb = require('../connect');

// connectDb();
const userSchema = new mongoose.Schema({
name: {
    type:String,
    required:true,
},
email: {
    type:String,
    required:true,
    unique:true,
    lowercase: true,
    trim: true,
},
password: {
    type:String,
    required:true,
}
});
const User = mongoose.model('users',userSchema);
module.exports =  User;
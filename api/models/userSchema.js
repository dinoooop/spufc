 const mongoose = require('mongoose');
 const connectDb = require('../connect');
// const connect = mongoose.connect('mongodb://127.0.0.1:27017/Admin_123');

// connect.then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('Could not connect to MongoDB', err);
// });
connectDb();
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
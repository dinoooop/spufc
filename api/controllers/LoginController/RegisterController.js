
const User = require('../../models/userSchema');
const bcrypt = require("bcrypt");

async function Register (req,res) {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
     
        const newUser = new User({ name, email, password: hashedPassword });
       
        await newUser.save();
        res.status(201).send(newUser);
      } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
          return res.status(400).send({ error: 'Email already exists' });
        }
        res.status(500).send(error);
      }
    
}
module.exports = { Register };
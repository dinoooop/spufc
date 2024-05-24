const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../../models/userSchema');


async function Register (req,res) {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
     
        const newUser = new User({ name, email, password: hashedPassword });
       
        await newUser.save();

        const token = jwt.sign({userId: user._id}, 'secretkey') ; 
      
        res.send({ token , newUser});

        //res.status(201).send(newUser);
      } catch (error) {
        console.log(error);
        if (error.name === 'MongoError' && error.code === 11000) {
          return res.status(400).send({ error: 'Email already exists' });
        }
        res.status(500).send(error);
      }
    
}
module.exports = { Register };
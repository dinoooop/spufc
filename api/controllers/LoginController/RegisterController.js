const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require('../../models/userSchema');

require('dotenv').config();
async function Register (req,res) {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
     
        const newUser = new User({ name, email, password: hashedPassword });
       
        await newUser.save();
        
        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET) ; 
      
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




// async function Register (req, res) {
//     try {
        

//         const { name, email, password } = req.body;
//         if (!name || !email || !password ) {
//           return res.status(401).json({ message: "All fields are required" });
//       }
//         const hashedPassword = await bcrypt.hash(password, 10);
     
//         const newUser = new User({ name, email, password: hashedPassword });
       
//         await newUser.save();
        
//         const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
      
//         res.send({ token, newUser });
//       } catch (error) {
//         console.log(error);
//         if (error.name === 'MongoError' && error.code === 11000) {
//           return res.status(402).send({ error: 'Email already exists' });
//         }
//         res.status(500).send(error);
//       }
// }

// module.exports = { Register };

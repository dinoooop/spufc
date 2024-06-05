const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require('../../models/userSchema');

require('dotenv').config();
// async function Register (req,res) {
//     try {
//         const { name, email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password,10);
     
//         const newUser = new User({ name, email, password: hashedPassword });
       
//         await newUser.save();
        
//         const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET) ; 
      
//         res.send({ token , newUser});

//         //res.status(201).send(newUser);
//       } catch (error) {
//         console.log(error);
//         if (error.name === 'MongoError' && error.code === 11000) {
//           return res.status(400).send({ error: 'Email already exists' });
//         }
//         res.status(500).send(error);
//       }
    
// }
// module.exports = { Register };
// onst bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
// const User = require('../../models/userSchema');
// require('dotenv').config();

const validateRegister = [
    check('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    check('email')
        .isEmail().withMessage('Email is invalid')
        .normalizeEmail(),
    check('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/\d/).withMessage('Password must contain a number')
];

async function Register (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        if (!name || !email || !password ) {
          return res.status(401).json({ message: "All fields are required" });
      }
        const hashedPassword = await bcrypt.hash(password, 10);
     
        const newUser = new User({ name, email, password: hashedPassword });
       
        await newUser.save();
        
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
      
        res.send({ token, newUser });
      } catch (error) {
        console.log(error);
        if (error.name === 'MongoError' && error.code === 11000) {
          return res.status(402).send({ error: 'Email already exists' });
        }
        res.status(500).send(error);
      }
}

module.exports = { Register, validateRegister };
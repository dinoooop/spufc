const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../../models/userSchema');


async function Register(req, res) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, 'secretkey');

    res.send({ token, user: newUser });

    //res.status(201).send(newUser);
  } catch (error) {
    return res.status(400).send({ message: 'Email already exists' });
  }

}
module.exports = { Register };
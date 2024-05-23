const express = require('express');
const bodyParser = require('body-parser');
const loginRouter = require('./routes/loginRouter');
const RegisterRouter = require('./routes/RegisterRouter');
const UserRouter = require('./routes/userRouter');
const ImageRouter = require('./routes/ImgDataRouter');
const path = require('path');



require('dotenv').config();
var cors = require('cors');

const app = express();

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended:false}))

app.use(cors("*"));
const PORT = process.env.PORT;
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Middleware
app.use(express.json())
app.use(bodyParser.json());
app.use(UserRouter);
app.use('/api',loginRouter);
app.use('/api',RegisterRouter);
app.use('/api/banners', ImageRouter);







app.get('/Allusers', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });


  app.post('/users', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.status(201).send(newUser);
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        return res.status(400).send({ error: 'Email already exists' });
      }
      res.status(500).send(error);
    }
  });

  app.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Update a user by ID
  app.put('/users/:id', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { name, email, password },
        { new: true, runValidators: true }
      );
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



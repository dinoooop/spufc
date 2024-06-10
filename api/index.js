
// import {express} from 'express';
// import {path} from 'path';
// import {bodyParser} from 'body-parser';
// import {cors} from 'cors';
// import {loginRouter} from './routes/loginRouter.js';
// import {RegisterRouter} from './routes/RegisterRouter.js';
// import {UserRouter} from './routes/userRouter.js';
// import {ImageRouter} from './routes/ImgDataRouter.js';
// import {AuthRouter} from './routes/AuthenticateUserRouter.js';
// import {SponsorsRouter} from './routes/sponsorRouter.js';
// import {aboutUsRoutes} from './routes/AboutUsRouter.js';
// import {eventRoutes} from './routes/eventsRouter.js';
// import {galleryRoutes} from './routes/galleryRouter.js';
// import {enquiry} from './routes/enquiryRouter.js';
// import { connectDb } from './connect.js';
// import dotenv from 'dotenv';

// dotenv.config();
// connectDb();

// const app = express();
// const PORT = process.env.PORT;

// app.use('/uploads', express.static(path.join(import.meta.url, 'uploads')));
// app.use(express.urlencoded({ extended: false }));

// app.use(cors());

// // Middleware
// app.use(express.json());
// app.use(bodyParser.json());
// app.use('/api', UserRouter);
// app.use('/api', loginRouter);
// app.use('/api', RegisterRouter);
// app.use('/api/banners', ImageRouter);
// app.use('/api', AuthRouter);
// app.use('/api/sponsors', SponsorsRouter);
// app.use('/api/settings', aboutUsRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/galleries', galleryRoutes);
// app.use('/api/enquiry', enquiry);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var cors = require('cors');
const loginRouter = require('./routes/loginRouter');
const RegisterRouter = require('./routes/RegisterRouter');
const UserRouter = require('./routes/userRouter');
const ImageRouter = require('./routes/ImgDataRouter');
const AuthRouter = require('./routes/AuthenticateUserRouter');
const SponsorsRouter = require('./routes/sponsorRouter');
const aboutUsRoutes = require('./routes/AboutUsRouter');
const eventRoutes = require('./routes/eventsRouter');
const galleryRoutes = require('./routes/galleryRouter');
const enquiry = require('./routes/enquiryRouter')
const connectDb = require('./connect');
require('dotenv').config();
connectDb();

const app = express();
const PORT = process.env.PORT;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended:false}))

app.use(cors("*"));

// Middleware
app.use(express.json())
app.use(bodyParser.json());     
app.use('/api', UserRouter);
app.use('/api',loginRouter);
app.use('/api',RegisterRouter);
app.use('/api/banners', ImageRouter);
app.use('/api', AuthRouter);
app.use('/api/sponsors',SponsorsRouter)
app.use('/api/settings',aboutUsRoutes);
app.use('/api/events',eventRoutes);
app.use('/api/galleries',galleryRoutes);
app.use('/api/enquiry',enquiry);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
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



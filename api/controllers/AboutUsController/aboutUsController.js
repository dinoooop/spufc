

const multer = require('multer');
const path = require('path');
const AboutUs = require('../../models/AboutUsSchema');
require('dotenv').config();

function generateRandomNumber() {
    return Math.floor(Math.random() * 1000000000);
}

// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + generateRandomNumber() + path.extname(file.originalname);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// Initialize upload
const upload = multer({ storage: storage });

const addFileforAboutUS = upload.single('file');



const upload_aboutpage = async (req, res) => {
    try {
        const { facebook, instagram, email, phone, title, description, address } = req.body;
        const image = req.file ? process.env.uploaded_path + req.file.filename : null;
        
        // Check if an AboutUs document already exists
        const existingAboutUs = await AboutUs.findOne();
        //console.log("existingAboutUs", existingAboutUs);

        if (existingAboutUs) {
            // Update only the provided fields
            if (facebook !== undefined) existingAboutUs.facebook = facebook;
            if (instagram !== undefined) existingAboutUs.instagram = instagram;
            if (email !== undefined) existingAboutUs.email = email;
            if (phone !== undefined) existingAboutUs.phone = phone;
            if (image !== null) existingAboutUs.image = image;
            if (title !== undefined) existingAboutUs.title = title;
            if (description !== undefined) existingAboutUs.description = description;
            if (address !== undefined) existingAboutUs.address = address;

            const updatedAboutUs = await existingAboutUs.save();
            return res.status(200).json(updatedAboutUs);
        }

        // Create a new document if none exists
        const newAboutUs = new AboutUs({
            facebook,
            instagram,
            email,
            phone,
            image,
            title,
            description,
            address
        });

        const aboutUs = await newAboutUs.save();
        res.status(201).json(aboutUs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { addFileforAboutUS, upload_aboutpage };
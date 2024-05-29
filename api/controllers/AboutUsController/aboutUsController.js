const multer = require('multer');
const path = require('path');
const AboutUs = require('../../models/AboutUsPage/AboutUsSchema');
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
const upload = multer({
    storage: storage
});
const addFileforAboutUS = upload.single('file');
// Email validation function
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};
const upload_aboutpage = async (req, res) => {
    try {
        const {
            facebook,
            instagram,
            email,
            phone,
            title,
            more,
            description,
            address
        } = req.body;
        const file = req.file ? process.env.uploaded_path + req.file.filename : null;

        // Validate email
        if (email && !isValidEmail(email)) {
            return res.status(400).json({
                msg: 'Invalid email address'
            });
        }
        const existingAboutUs = await AboutUs.findOne();


        if (existingAboutUs) {
            // Update only the provided fields
            if (facebook !== undefined) existingAboutUs.facebook = facebook;
            if (instagram !== undefined) existingAboutUs.instagram = instagram;
            if (email !== undefined) existingAboutUs.email = email;
            if (phone !== undefined) existingAboutUs.phone = phone;
            if (file !== null) existingAboutUs.file = file;
            if (title !== undefined) existingAboutUs.title = title;
            if (more !== undefined) existingAboutUs.more = more;
            if (description !== undefined) existingAboutUs.description = description;
            if (address !== undefined) existingAboutUs.address = address;

            const updatedAboutUs = await existingAboutUs.save();
            return res.status(200).json({
                message: "Data updated Succesfully"
            });
        }

        // Create a new document if none exists
        const newAboutUs = new AboutUs({
            facebook,
            instagram,
            email,
            phone,
            file: req.file ? process.env.uploaded_path + req.file.filename : null,
            title,
            more,
            description,
            address
        });

        const aboutUs = await newAboutUs.save();
        res.status(201).json({
            message: "Data created Succesfully"
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    addFileforAboutUS,
    upload_aboutpage
};
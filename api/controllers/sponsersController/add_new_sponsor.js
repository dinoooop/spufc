const multer = require('multer');
const path = require('path');
const Sponsor = require('../../models/sponsorSchema');
require('dotenv').config();



function generateRandomNumber() {
    return Math.floor(Math.random() * 1000000000);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //console.log('UPLOAD_PATH:', process.env.UPLOAD_PATH);
        cb(null, 'uploads'); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + generateRandomNumber();
        const fileExtension = path.extname(file.originalname);

        cb(null, uniqueSuffix + fileExtension);

    }
});

// Initialize upload
const upload = multer({
    storage: storage
});


const cpUpload = upload.fields([{
    name: 'logo',
    maxCount: 1
}, {
    name: 'photos',
    maxCount: 8
}]);

const uploadSponsors = async (req, res) => {

    const {
        name,
        description,
        type,
        website,
        phone,
        status,
        address,
        email,
        offers
    } = req.body;

    // Check if photos are present in the payload
    if (!req.files['photos'] || req.files['photos'].length === 0) {
        return res.status(400).json({
            message: 'Photos are required'
        });
    }

    // Check if logo is present in the payload
    if (!req.files['logo'] || req.files['logo'].length === 0) {
        return res.status(400).json({
            message: 'Logo is required'
        });
    }

    // Check if email is present in the payload
    if (!email) {
        return res.status(400).json({
            message: 'Email is required'
        });
    }

    // Check if name is present in the payload
    if (!name) {
        return res.status(400).json({
            message: 'Name is required'
        });
    }

    const logo = req.files['logo'] ? req.files['logo'][0].filename : null;
    const photos = req.files['photos'].map(file => process.env.uploaded_path + file.filename);
    const newLogo = process.env.uploaded_path + logo;


    try {
        const newSponsor = new Sponsor({
            name,
            description,
            logo: newLogo,
            photos,
            type,
            website,
            phone,
            status,
            address,
            email,
            offers
        });

        const savedSponsor = await newSponsor.save();
        res.status(201).json(savedSponsor);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}





module.exports = {
    cpUpload,
    uploadSponsors
}
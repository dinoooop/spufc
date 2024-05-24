const express = require ("express");
const multer = require('multer');
const path = require('path');
const Sponsor = require('../models/sponsorSchema')
const router = express.Router();

const {get_All_sponsor} = require('../controllers/sponsersController/get_all_sponsors')

router.get('/',get_All_sponsor );

function generateRandomNumber() {
    return Math.floor(Math.random() * 1000000000);
}

// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + generateRandomNumber();
        const fileExtension = path.extname(file.originalname); 
        cb(null, uniqueSuffix + fileExtension );
    }
});

// Initialize upload
const upload = multer({ storage: storage });


const cpUpload = upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'photos', maxCount: 8 }])
router.post('/',cpUpload , async (req, res) => {
    const { name, description, type, website, phone, status, address, email, offers } = req.body;
    
    const logo = req.files['logo'][0].filename;
    const photos = req.files['photos'].map(file => file.filename);

    try {
        const newSponsor = new Sponsor({
            name,
            description,
            logo,
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
        res.status(400).json({ message: error.message });
    }
})



module.exports = router;
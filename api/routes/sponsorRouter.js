const express = require ("express");
const multer = require('multer');
const path = require('path');
const Sponsor = require('../models/sponsorSchema')
const router = express.Router();

const { get_All_sponsor } = require('../controllers/sponsersController/get_all_sponsors');
const { uploadSponsor,cpUpload } = require('../controllers/sponsersController/add_new_sponsor')

router.get('/',get_All_sponsor );

// function generateRandomNumber() {
//     return Math.floor(Math.random() * 1000000000);
// }

// // Set up storage engine
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads'); // Ensure this directory exists
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + generateRandomNumber();
//         const fileExtension = path.extname(file.originalname); 
//         cb(null, uniqueSuffix + fileExtension );
//     }
// });

// // Initialize upload
// const upload = multer({ storage: storage });


// const cpUpload = upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'photos', maxCount: 8 }])
router.post('/',cpUpload ,uploadSponsor);
//  async (req, res) => {
//     const { name, description, type, website, phone, status, address, email, offers } = req.body;
    

//     const logo = req.files['logo'][0].filename;
//     const photos = req.files['photos'].map(file => file.filename);

//     try {
//         const newSponsor = new Sponsor({
//             name,
//             logo,
//             photos,
//             description,
//             type,
//             website,
//             phone,
//             status,
//             address,
//             email,
//             offers
            
//         });

//         const savedSponsor = await newSponsor.save();
//         res.status(201).json(savedSponsor);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

router.delete('/:id', async (req, res) => {
    try {
        const sponsor = await Sponsor.findById(req.params.id);
        if (!sponsor) {
            return res.status(404).json({ message: 'Sponsor not found' });
        }

        // Delete files from the filesystem
        const deleteFile = (filePath) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Failed to delete file: ${filePath}`, err);
                }
            });
        };

        // Delete the logo
        deleteFile(path.join('uploads', sponsor.logo));

        // Delete the photos
        sponsor.photos.forEach(photo => deleteFile(path.join('uploads', photo)));

        // Delete the sponsor from the database
        await Sponsor.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Sponsor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




module.exports = router;
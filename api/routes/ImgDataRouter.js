const express = require('express');
const multer = require('multer');
const Image = require('../models/imageSchema');
const { get_All_Images } = require('../controllers/Image_data_controller/get_all_Image');

const router = express.Router();


router.get('/',get_All_Images );

function generateRandomNumber() {
    return Math.floor(Math.random() * 1000000000);
}

// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + generateRandomNumber();
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// Initialize upload
const upload = multer({ storage: storage });

// Define the route
router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    // console.log('req.file', req.file);

    const newImage = new Image({
        name: req.body.name,
        image: req.file.filename
         
    });
    console.log('req.file', req.file);
    newImage.save()
        .then(() => res.json({ message: 'Successfully uploaded' }))
        .catch(err => console.log(err));
});





// Read (Get) an image by ID
router.get('/:id', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.status(200).json(image);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

//Update an image
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const updatedData = {
            name: req.body.name
        };
        if (req.file) {
            updatedData.data = req.file.buffer;
            updatedData.contentType = req.file.mimetype;
        }
        const image = await Image.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.status(200).json(image);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

//Delete an image
router.delete('/:id', async (req, res) => {
    try {
        const image = await Image.findByIdAndDelete(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.status(200).json({ message: 'Image deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

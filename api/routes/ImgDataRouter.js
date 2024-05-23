const express = require('express');
const multer = require('multer');
const Image = require('../models/imageSchema');
const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the destination directory for the uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Specify the file name
    }
});

// Initialize upload
const upload = multer({ storage: storage });

// Define the route
router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    console.log('req.file', req.file);

    const newImage = new Image({
        name: req.body.name,
        image: {
            data: req.file.filename,
            contentType: 'image/png'
        }
    });
    newImage.save()
        .then(() => res.send('Successfully uploaded'))
        .catch(err => console.log(err));
});



// Read (Get) all images
router.get('/getAll', async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Read (Get) an image by ID
router.get('/:id', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.status(200).json(image);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
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
            return res.status(404).json({ error: 'Image not found' });
        }
        res.status(200).json(image);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

//Delete an image
router.delete('/:id', async (req, res) => {
    try {
        const image = await Image.findByIdAndDelete(req.params.id);
        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.status(200).json({ message: 'Image deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

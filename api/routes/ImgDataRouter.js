const express = require('express');
const multer = require('multer');
const Image = require('../models/imageSchema');
const router = express.Router();

// Set up multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create (Insert) an image
router.post('/', upload.single('image'), async (req, res) => {
    console.log("i am hrere");
    try {
        const newImage = new Image({
            name: req.body.name,
            data: req.file.buffer,
            contentType: req.file.mimetype
        });
        console.log("newImage",newImage);
        await newImage.save();
        res.status(201).json(newImage);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
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

// Update an image
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

// Delete an image
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

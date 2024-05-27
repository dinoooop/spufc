const express = require('express');
const Image = require('../models/imageSchema');
const { get_All_Images } = require('../controllers/Image_data_controller/get_all_Image');
const { addFile,uploadImage } = require('../controllers/Image_data_controller/Image_upload');
const { get_single_image } = require('../controllers/Image_data_controller/get_Image');


const router = express.Router();


router.get('/',get_All_Images );
router.post('/',addFile,uploadImage);
router.get('/:id',get_single_image)



// Read (Get) an image by ID


// Delete an image
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


// router.delete('/:id', async (req, res) => {
//     try {
//         const image = await Image.findByIdAndDelete(req.params.id);
//         console.log("image",image);
//         if (!image) {
//             return res.status(404).json({ message: 'Image not found' });
//         }

//         // Construct the file path
//         const filePath = path.join(__dirname, 'uploads', image.filepath);

//         // Delete the file from the filesystem
//         fs.unlink(filePath, (err) => {
//             if (err) {
//                 console.error('Failed to delete file:', err);
//                 return res.status(500).json({ message: 'Failed to delete file' });
//             }

//             res.status(200).json({ message: 'Image and file deleted' });
//         });
//     } catch (err) {
//         console.error('Server error:', err);
//         res.status(500).json({ message: 'Server error' });
//     }
// });



module.exports = router;

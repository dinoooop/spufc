const multer = require('multer');
const path = require('path');
const Gallary = require('../../models/gallarySchema');
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


const cpUpdate = upload.fields([{
    name: 'logo',
    maxCount: 1
}, {
    name: 'photos',
    maxCount: 8
}]);


const updatgallary = async (req, res) => {
     
    const name = req.body.name

    const gallaryId = req.params.id; // Extract event ID from request parameters

    try {
        // Fetch the event document from the database based on the event ID
        const gallary = await Gallary.findById(gallaryId);

        // If event not found, return 404 error
        if (!gallary) {
            return res.status(404).json({
                message: 'event not found'
            });
        }

        // Update event fields with new data from request body
        if (name) gallary.name = name;
    
        // Update logo if provided
        if (req.files && req.files['logo'] && req.files['logo'].length > 0) {
            const logo = req.files['logo'][0].filename;
            gallary.logo = process.env.uploaded_path + logo;
        }

        // Update photos if provided
        if (req.files && req.files['photos'] && req.files['photos'].length > 0) {
            const photos = req.files['photos'].map(file => process.env.uploaded_path + file.filename);
            gallary.photos = photos;
        }

        // Save the updated gallary document
        const updatedGallary = await gallary.save();

        // Return the updated gallary document in the response
        res.status(200).json({
            message: "Gallary Updated succesfully"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}


module.exports = {
    cpUpdate,
    updatgallary
};
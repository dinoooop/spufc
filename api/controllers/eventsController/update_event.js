const multer = require('multer');
const path = require('path');
const events = require('../../models/eventsSchema');
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


const updatevent = async (req, res) => {

    const {
        name,
        description,
        start_at,
        type,
        website,
        phone,
        email,
        address,
        longitude,
        latitude,
        offers,
        payment_link
    } = req.body;

    const eventId = req.params.id; // Extract event ID from request parameters

    try {
        // Fetch the event document from the database based on the event ID
        const event = await events.findById(eventId);

        // If event not found, return 404 error
        if (!event) {
            return res.status(404).json({
                message: 'event not found'
            });
        }

        // Update event fields with new data from request body
        if (name) event.name = name;
        if (description) event.description = description;
        if (start_at) event.start_at = start_at;
        if (type) event.type = type;
        if (website) event.website = website
        //if (website) event.website = website || "";
        if (phone) event.phone = phone;
        if (email) event.email = email;
        if (address) event.address = address;
        if (longitude) event.longitude = longitude;
        if (latitude) event.latitude = latitude;
        if (offers) event.offers = offers;
        if (payment_link) event.payment_link = payment_link;

        // Update logo if provided
        if (req.files && req.files['logo'] && req.files['logo'].length > 0) {
            const logo = req.files['logo'][0].filename;
            event.logo = process.env.uploaded_path + logo;
        }

        // Update photos if provided
        if (req.files && req.files['photos'] && req.files['photos'].length > 0) {
            const photos = req.files['photos'].map(file => process.env.uploaded_path + file.filename);
            event.photos = photos;
        }

        // Save the updated event document
        const updatedevent = await event.save();

        // Return the updated event document in the response
        res.status(200).json({
            message: "Event Updated succesfully"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}


module.exports = {
    cpUpdate,
    updatevent
};
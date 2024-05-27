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
      
        cb(null, uniqueSuffix + fileExtension );
        
    }
});

// Initialize upload
const upload = multer({ storage: storage });


const cpUpdate = upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'photos', maxCount: 8 }]);

// const updateSponsor = async (req, res) => {
//     const { name, description, type, website, phone, status, address, email, offers } = req.body;
    
//     console.log(req.body);
//     console.log(req.files);
//     // Check if photos are present in the payload
//     if (!req.files['photos'] || req.files['photos'].length === 0) {
//         return res.status(400).json({ message: 'Photos are required' });
//     }
    
//         // Check if logo is present in the payload
//         if (!req.files['logo'] || req.files['logo'].length === 0) {
//             return res.status(400).json({ message: 'Logo is required' });
//         }
        
//         // Check if email is present in the payload
//         if (!email) {
//             return res.status(400).json({ message: 'Email is required' });
//         }
        
//         // Check if name is present in the payload
//         if (!name) {
//             return res.status(400).json({ message: 'Name is required' });
//         }

//         // console.log(process.env.uploaded_path);
//     const logo = req.files['logo'] ? req.files['logo'][0]. filename : null;
//     const photos = req.files['photos'].map(file => process.env.uploaded_path + file.filename);
//     const newLogo = process.env.uploaded_path + logo;
//     console.log("logo,photos",logo,photos);
    
//     // try {
//     //     const newSponsor = new Sponsor({
//     //         name,
//     //         description,
//     //         logo: newLogo,
//     //         photos,
//     //         type,
//     //         website,
//     //         phone,
//     //         status,
//     //         address,
//     //         email,
//     //         offers
//     //     });

//     //     const savedSponsor = await newSponsor.save();
//     //     res.status(201).json(savedSponsor);
//     // } catch (error) {
//     //     res.status(400).json({ message: error.message });
//     // }
// }
const updateSponsor = async (req, res) => {
    const { name, description, type, website, phone, status, address, email, offers } = req.body;
    
    const sponsorId = req.params.id; // Extract sponsor ID from request parameters

    try {
        // Fetch the sponsor document from the database based on the sponsor ID
        const sponsor = await Sponsor.findById(sponsorId);

        // If sponsor not found, return 404 error
        if (!sponsor) {
            return res.status(404).json({ message: 'Sponsor not found' });
        }

        // Update sponsor fields with new data from request body
        if (name) sponsor.name = name;
        if (description) sponsor.description = description;
        if (type) sponsor.type = type;
        if (website) sponsor.website = website;
        if (phone) sponsor.phone = phone;
        if (status) sponsor.status = status;
        if (address) sponsor.address = address;
        if (email) sponsor.email = email;
        if (offers) sponsor.offers = offers;

        // Update logo if provided
        if (req.files && req.files['logo'] && req.files['logo'].length > 0) {
            const logo = req.files['logo'][0].filename;
            sponsor.logo = process.env.uploaded_path + logo;
        }

        // Update photos if provided
        if (req.files && req.files['photos'] && req.files['photos'].length > 0) {
            const photos = req.files['photos'].map(file => process.env.uploaded_path + file.filename);
            sponsor.photos = photos;
        }

        // Save the updated sponsor document
        const updatedSponsor = await sponsor.save();

        // Return the updated sponsor document in the response
        res.status(200).json(updatedSponsor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports = { cpUpdate, updateSponsor };

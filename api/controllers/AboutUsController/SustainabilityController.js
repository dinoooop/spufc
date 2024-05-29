// const multer = require('multer');
// const path = require('path');
// const sustainability = require('../../models/AboutUsPage/sustainabilitySchema');
// require('dotenv').config();



// function generateRandomNumber() {
//     return Math.floor(Math.random() * 1000000000);
// }

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         //console.log('UPLOAD_PATH:', process.env.UPLOAD_PATH);
//         cb(null, 'uploads'); // Ensure this directory exists
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + generateRandomNumber();
//         const fileExtension = path.extname(file.originalname);

//         cb(null, uniqueSuffix + fileExtension);

//     }
// });

// // Initialize upload
// const upload = multer({
//     storage: storage
// });


// const SustainabilityUpload = upload.fields([{
//     name: 'file',
//     maxCount: 1
// }, {
//     name: 'photos',
//     maxCount: 8
// }]);

// const uploadSustainability = async (req, res) => {

//     const {
//         title,discription
//     } = req.body;

//     // Check if bannar are present in the payload
//     if (!req.files['file'] || req.files['file'].length === 0) {
//         return res.status(400).json({
//             message: 'bannar are required'
//         });
//     }

//     // Check if photos is present in the payload
//     if (!req.files['photos'] || req.files['photos'].length === 0) {
//         return res.status(400).json({
//             message: 'photos is required'
//         });
//     }

//     // Check if title is present in the payload
//     if (!title) {
//         return res.status(400).json({
//             message: 'title is required'
//         });
//     }

//     // Check if discription is present in the payload
//     if (!discription) {
//         return res.status(400).json({
//             message: 'discription is required'
//         });
//     }

//     const file = req.files['file'] ? req.files['file'][0].filename : null;
//     const photos = req.files['photos'].map(file => process.env.uploaded_path + file.filename);
//     const newbannar = process.env.uploaded_path + bannar;


//     try {
//         const newSustainability = new sustainability({
//             title,
//             file: newbannar,
//             photos,
//             discription
            
//         });

//         const savedSustainability = await newSustainability.save();
//         res.status(201).json(savedSustainability);
//     } catch (error) {
//         res.status(400).json({
//             message: error.message
//         });
//     }
// }





// module.exports = {
//     SustainabilityUpload,
//     uploadSustainability
// };
const multer = require('multer');
const path = require('path');
const sustainability = require('../../models/AboutUsPage/sustainabilitySchema');
require('dotenv').config();

function generateRandomNumber() {
    return Math.floor(Math.random() * 1000000000);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
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

const SustainabilityUpload = upload.fields([{
    name: 'file',
    maxCount: 1
}, {
    name: 'photos',
    maxCount: 8
}]);

const uploadSustainability = async (req, res) => {
    const { title, discription } = req.body;
    console.log(req.body);
    console.log(req.file);

    // Check if file is present in the payload
    if (!req.files || !req.files['file'] || req.files['file'].length === 0) {
        return res.status(400).json({
            message: 'bannar is required'
        });
    }

    // Check if photos are present in the payload
    if (!req.files || !req.files['photos'] || req.files['photos'].length === 0) {
        return res.status(400).json({
            message: 'photos are required'
        });
    }

    // Check if title is present in the payload
    if (!title) {
        return res.status(400).json({
            message: 'title is required'
        });
    }

    // Check if discription is present in the payload
    if (!discription) {
        return res.status(400).json({
            message: 'discription is required'
        });
    }

    const file = req.files['file'][0].filename;
    const photos = req.files['photos'].map(file => process.env.UPLOADED_PATH + file.filename);
    const newbannar = process.env.UPLOADED_PATH + file;

    try {
        const newSustainability = new sustainability({
            title,
            bannar: newbannar,
            photos,
            discription
        });

        const savedSustainability = await newSustainability.save();
        res.status(201).json(savedSustainability);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

module.exports = {
    SustainabilityUpload,
    uploadSustainability
};

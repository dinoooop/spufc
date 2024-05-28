const multer = require('multer');
const Image = require('../../models/imageSchema');

require('dotenv').config();

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

const updateFile =  upload.single('file');

//    const updateImage = async(req, res) => {
//         const name = req.body.name
//         const ImageId = req.params.id; // Extract sponsor ID from request parameters
//     console.log(name,ImageId);
//         try {
//             // Fetch the sponsor document from the database based on the sponsor ID
//             const images = await Image.findById(ImageId);
    
//             // If sponsor not found, return 404 error
//             if (!images) {
//                 return res.status(404).json({ message: 'Sponsor not found' });
//             }
    
//             // Update sponsor fields with new data from request body
//             if (name) images.name = name;
//             // Update logo if provided
        
//             const image = req.files.filename;
//             images.image = process.env.uploaded_path + image;
        
//         // Save the updated sponsor document
//         const updatedImage = await Image.save();
    
//       // Return the updated sponsor document in the response
//       res.status(200).json(updatedImage);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };



//module.exports = { updateFile,updateImage };





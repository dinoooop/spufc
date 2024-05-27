const multer = require('multer');
const Image = require('../../models/imageSchema');


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

const addFile =  upload.single('file');

   const uploadImage = async(req, res) => {
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
};
module.exports = { addFile,uploadImage };





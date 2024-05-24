const Sponsor = require('../../models/sponsorSchema')
const multer = require('multer');

function generateRandomNumber() {
    return Math.floor(Math.random() * 1000000000);
}

// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Sponsors/'); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + generateRandomNumber();
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// Initialize upload
const upload = multer({ storage: storage });

const uploadSponsor = async(req,res) =>{ ( upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'photos', maxCount: 10 }]), async (req, res) => {
    const { name, description, type, website, phone, status, address, email, offers } = req.body;
    const logo = req.files['logo'][0].path;
    const photos = req.files['photos'].map(file => file.path);

    try {
        const newSponsor = new Sponsor({
            name,
            description,
            logo,
            photos,
            type,
            website,
            phone,
            status,
            address,
            email,
            offers
        });

        const savedSponsor = await newSponsor.save();
        res.status(201).json(savedSponsor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
}
module.exports = { uploadSponsor }


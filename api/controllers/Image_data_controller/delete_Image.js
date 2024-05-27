
const Image = require('../../models/imageSchema');


const deleteImage = async (req, res) => {
    try {
        const image = await Image.findByIdAndDelete(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.status(200).json({ message: 'Image deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = { deleteImage }
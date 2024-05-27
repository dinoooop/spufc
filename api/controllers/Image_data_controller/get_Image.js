
const Image = require('../../models/imageSchema');

const get_single_image =  async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.status(200).json(image);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = { get_single_image };

const Image = require('../../models/imageSchema');

const get_All_Images =  async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = { get_All_Images }; 
const AboutUs = require('../../models/AboutUsPage/AboutUsSchema');

const get_All_AboutUs =  async (req, res) => {
    try {
        const images = await AboutUs.find();
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = { get_All_AboutUs };
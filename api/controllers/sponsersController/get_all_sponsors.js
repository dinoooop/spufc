const Sponsor = require('../../models/sponsorSchema');

const get_All_sponsor =  async (req, res) => {
    try {
        const images = await Sponsor.find();
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = { get_All_sponsor }; 
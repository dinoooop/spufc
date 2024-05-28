const Sponsor = require('../../models/sponsorSchema');
const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
    const { id } = req.params;

    // Check if the id parameter is provided
    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    // Check if the id parameter is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    next();
};

const get_single_sponsor =  async (req, res) => {
    try {
        const sponsor = await Sponsor.findById(req.params.id);
        if (!sponsor) {
            return res.status(404).json({ message: 'sponsor not found' });
        }
        res.status(200).json(sponsor);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = { get_single_sponsor,validateObjectId };
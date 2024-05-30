const Gallery = require('../../models/gallarySchema');
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

const get_single_gallery =  async (req, res) => {
    
    try {
        const gallery = await Gallery.findById(req.params.id);
        if (!gallery) {
            return res.status(404).json({ message: 'Gallery not found' });
        }
        res.status(200).json(gallery);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = { get_single_gallery,validateObjectId };
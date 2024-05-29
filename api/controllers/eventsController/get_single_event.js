const Events = require('../../models/eventsSchema');
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

const get_single_event =  async (req, res) => {
    console.log("id",req.params.id);
    try {
        const event = await Events.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'event not found' });
        }
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = { get_single_event,validateObjectId };
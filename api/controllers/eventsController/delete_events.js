const event = require('../../models/eventsSchema');


const deleteEvent = async (req, res) => {
    console.log(req.params.id);
    try {
        const events = await event.findByIdAndDelete(req.params.id);
        if (!events) {
            return res.status(404).json({ message: 'event not found' });
        }
        res.status(200).json({ message: 'event deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = { deleteEvent };
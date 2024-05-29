const events = require('../../models/eventsSchema');

const get_All_events =  async (req, res) => {
    try {
        const Events = await events.find().sort({ start_at: -1 });;
        res.status(200).json(Events);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = { get_All_events }; 
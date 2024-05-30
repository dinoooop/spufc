const events = require('../../models/eventsSchema');

const get_All_events =  async (req, res) => {
    try {
    //     console.log('Received query parameters:', req.query); 
         const query = {};
    //    console.log("query",query);
        if (req.query.type) {
            query.type = req.query.type;
        }
        const Events = await events.find(query).sort({ start_at: -1 });;
        res.status(200).json(Events);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = { get_All_events }; 


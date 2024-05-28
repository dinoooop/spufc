const Sponsor = require('../../models/sponsorSchema');


const deleteSponsor = async (req, res) => {
    try {
        const sponsor = await Sponsor.findByIdAndDelete(req.params.id);
        if (!sponsor) {
            return res.status(404).json({ message: 'Sponsor not found' });
        }
        res.status(200).json({ message: 'Sponsor deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = { deleteSponsor };
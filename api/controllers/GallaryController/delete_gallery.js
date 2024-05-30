const gallery = require('../../models/gallarySchema');


const deletegallery = async (req, res) => {
    
    try {
        const events = await gallery.findByIdAndDelete(req.params.id);
        if (!gallery) {
            return res.status(404).json({ message: 'gallery not found' });
        }
        res.status(200).json({ message: 'gallery deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = { deletegallery };
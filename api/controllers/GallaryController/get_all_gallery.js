const gallery = require('../../models/gallarySchema');

const get_All_gallery =  async (req, res) => {
    try {
        const Gallery = await gallery.find();
        res.status(200).json(Gallery);
    } catch (err) {
        
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = { get_All_gallery }; 


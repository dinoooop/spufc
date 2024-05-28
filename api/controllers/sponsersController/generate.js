
const Sponsor = require('../../models/sponsorSchema');

const generate = async (req, res) => {
    try {
        const sponsors = await Sponsor.find();
        const baseURL = "http://127.0.0.1:8800/uploads/";

        for (const sponsor of sponsors) {
            let needsUpdate = false;

            if (!sponsor.logo.startsWith(baseURL)) {
                sponsor.logo = `${baseURL}${sponsor.logo}`;
                needsUpdate = true;
            }

            sponsor.photos = sponsor.photos.map(photo => {
                if (!photo.startsWith(baseURL)) {
                    needsUpdate = true;
                    return `${baseURL}${photo}`;
                }
                return photo;
            });

            if (needsUpdate) {
                await sponsor.save();
            }
        }

        res.status(200).json(sponsors);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = { generate }; 
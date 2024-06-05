const Enquiry = require('../../models/enquirySchema');
const uploadEnquiry = async (req, res) => {
    const {
        name,
        phone,
        email,
        enquiry
    } = req.body;

    if (!name || !phone || !email || !enquiry) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        const newEnquiry = new Enquiry({
            name,
            phone,
            email,
            enquiry
        });

        const savedEnquiry = await newEnquiry.save();
        res.status(201).json(savedEnquiry);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}


module.exports = { uploadEnquiry };



const Enquiry = require('../../models/enquirySchema');


const updatenquiry = async (req, res) => {
      console.log(req.body);
    const {
        name,
        phone,
        email,
       enquiry
    } = req.body;

   

    const enquiryId = req.params.id; // Extract event ID from request parameters

    try {
        // Fetch the event document from the database based on the event ID
        const newEnquiry = await Enquiry.findById(enquiryId);

        // If event not found, return 404 error
        if (!newEnquiry) {
            return res.status(404).json({
                message: 'Enquiry not found'
            });
        }

        // Update event fields with new data from request body
        if (name) newEnquiry.name = name;
       
        if (phone) newEnquiry.phone = phone;
        if (email) newEnquiry.email = email;
       
        if (enquiry) newEnquiry.enquiry = enquiry;
        
        const updatedevent = await newEnquiry.save();

        // Return the updated event document in the response
        res.status(200).json({
            message: "enquiry Updated succesfully"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}


module.exports = {
  
    updatenquiry
};
const express = require('express')
const router = express.Router();
const { uploadEnquiry } = require('../controllers/EnquiryController/add_enquiry');
const {  updatenquiry } = require ('../controllers/EnquiryController/update_enquiry');

router.post('/',uploadEnquiry)
router.put('/:id',updatenquiry)
module.exports = router;
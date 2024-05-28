const express = require('express');
const router = express.Router();
const { addFileforAboutUS, upload_aboutpage } = require('../controllers/AboutUsController/aboutUsController');
const { get_All_AboutUs } = require('../controllers/AboutUsController/get_aboutus_data')

// POST /aboutus
router.post('/', addFileforAboutUS, upload_aboutpage);
router.get('/',get_All_AboutUs)

module.exports = router;

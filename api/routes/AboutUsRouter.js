const express = require('express');
const router = express.Router();
const { addFileforAboutUS, upload_aboutpage } = require('../controllers/AboutUsController/aboutUs/aboutUsController');
const { get_All_AboutUs } = require('../controllers/AboutUsController/aboutUs/get_aboutus_data');
//const  { SustainabilityUpload, uploadSustainability } = require('../controllers/AboutUsController/sustainability/SustainabilityController')

// POST /aboutus
router.post('/', addFileforAboutUS, upload_aboutpage);
router.get('/',get_All_AboutUs);
//router.post('/sustainability',uploadSustainability,SustainabilityUpload);

module.exports = router;

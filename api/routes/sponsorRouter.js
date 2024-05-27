const express = require ("express");

const router = express.Router();

const { get_All_sponsor } = require('../controllers/sponsersController/get_all_sponsors');
const { cpUpload, uploadSponsors } = require('../controllers/sponsersController/add_new_sponsor');

const {validateObjectId, get_single_sponsor } = require('../controllers/sponsersController/get_single_sponsor');
const { generate } = require('../controllers/sponsersController/generate');

router.get('/',get_All_sponsor );
router.get('/generate', generate );
router.get('/:id',validateObjectId,get_single_sponsor );
router.post('/', cpUpload,uploadSponsors);





module.exports = router;
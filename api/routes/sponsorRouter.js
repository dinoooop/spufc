const express = require ("express");

const router = express.Router();

const { get_All_sponsor } = require('../controllers/sponsersController/get_all_sponsors');
const { cpUpload, uploadSponsors } = require('../controllers/sponsersController/add_new_sponsor');

const {validateObjectId, get_single_sponsor } = require('../controllers/sponsersController/get_single_sponsor');
const { cpUpdate, updateSponsor } = require('../controllers/sponsersController/update_sponsor');
const { deleteSponsor } = require('../controllers/sponsersController/delete_sponsor');


router.get('/',get_All_sponsor );
router.get('/:id',validateObjectId,get_single_sponsor );
router.post('/', cpUpload,uploadSponsors);
router.put('/:id',cpUpdate,updateSponsor)
router.delete('/:id',deleteSponsor)




module.exports = router;
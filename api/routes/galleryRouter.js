const express = require('express');
const router = express.Router();
const { cpUpload,uploadgallery } = require('../controllers/GallaryController/add_new_gallery');
const { get_All_gallery } = require('../controllers/GallaryController/get_all_gallery');
const { get_single_gallery,validateObjectId } = require('../controllers/GallaryController/get_single_gallery');
const {deletegallery} = require('../controllers/GallaryController/delete_gallery');
const { cpUpdate, updatgallary } = require('../controllers/GallaryController/update_gallery');

router.post('/', cpUpload,uploadgallery);
router.get('/', get_All_gallery);
router.get('/:id', validateObjectId, get_single_gallery);
router.delete('/:id', deletegallery );
router.put('/:id',cpUpdate, updatgallary);
module.exports = router;

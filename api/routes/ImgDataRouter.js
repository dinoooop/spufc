const express = require('express');

const { get_All_Images } = require('../controllers/Image_data_controller/get_all_Image');
const { addFile,uploadImage } = require('../controllers/Image_data_controller/Image_upload');
const { get_single_image } = require('../controllers/Image_data_controller/get_Image');
const { deleteImage } = require('../controllers/Image_data_controller/delete_Image');
//const { updateFile,updateImage } = require('../controllers/Image_data_controller/update_Image_byId')

const router = express.Router();


router.get('/',get_All_Images );
router.post('/',addFile,uploadImage);
router.get('/:id',get_single_image);
//router.put('/:id',updateFile,updateImage);
router.delete('/:id',deleteImage);



module.exports = router;

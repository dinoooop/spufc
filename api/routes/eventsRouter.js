const express = require('express');
const router = express.Router();
const { cpUpload,uploadEvents } = require('../controllers/eventsController/add_new_event');
const { get_All_events } = require('../controllers/eventsController/get_all_events');
const { get_single_event,validateObjectId } = require('../controllers/eventsController/get_single_event');
const {deleteEvent} = require('../controllers/eventsController/delete_events');
const { cpUpdate, updatevent } = require('../controllers/eventsController/update_event');

router.post('/', cpUpload,uploadEvents);
router.get('/', get_All_events);
router.get('/:id', validateObjectId, get_single_event);
router.delete('/:id', deleteEvent );
router.put('/:id',cpUpdate, updatevent);
module.exports = router;

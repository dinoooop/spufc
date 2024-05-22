const express = require ("express");

const {  Register } = require('../controllers/LoginController/RegisterController');

const router = express.Router();

router.post('/register',Register);
module.exports = router;
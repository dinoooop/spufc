const express = require ("express");

const { validateRegister, Register } = require('../controllers/LoginController/RegisterController');

const router = express.Router();

router.post('/register',validateRegister, Register);
module.exports = router;
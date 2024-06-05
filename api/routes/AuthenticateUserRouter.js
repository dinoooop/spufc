const express = require('express');
const jwt = require('jsonwebtoken');
const { AuthUser,authenticate } = require('../controllers/AuthenticateUserController/AuthUserController'); // Adjust the path to your User model
const router = express.Router();


// Route to get user details
router.get('/check', authenticate, AuthUser)

module.exports = router;



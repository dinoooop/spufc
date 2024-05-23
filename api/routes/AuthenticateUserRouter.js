const express = require('express');
const jwt = require('jsonwebtoken');
const { AuthUser } = require('../controllers/AuthenticateUserController/AuthUserController'); // Adjust the path to your User model
const router = express.Router();



// Middleware to authenticate the token
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.user = decoded; // Attach the decoded token to the request object
        next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid token." });
    }
};

// Route to get user details
router.get('/check', authenticate, AuthUser)

module.exports = router;



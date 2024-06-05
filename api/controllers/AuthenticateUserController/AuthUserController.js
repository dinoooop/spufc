require('dotenv').config();
const User = require('../../models/userSchema')
const AuthUser =  async (req, res) => {
    try {
        const tokenuser = await User.findById(req.user.userId); // Exclude the password field
        // console.log("user",user);
        if (!tokenuser) {
            return res.status(404).json({ message: "User not found" });
        }
            const user = await User.findById(tokenuser._id);
           
            if (!user) {
              return res.status(404).send({ error: 'User not found' });
            }

        res.json({ user :{userId :user._id,name:user.name,email:user.email} });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ message: "Failed to fetch user details" });
    }
}

// Middleware to authenticate the token
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded token to the request object
        next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid token." });
    }
};
module.exports = { AuthUser,authenticate };
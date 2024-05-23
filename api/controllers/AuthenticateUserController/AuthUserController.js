
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
module.exports = { AuthUser };
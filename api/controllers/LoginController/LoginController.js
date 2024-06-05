const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const User = require('../../models/userSchema');

require('dotenv').config();
 const login = async(req,res) =>{
    const  email = req.body.email;
    const  password = req.body.password;
    

    if ( !email || !password) {
        return res.status(400).json({ message: "email and password are required" });
    }
    try {
        
        const user = await User.findOne({ email: email  });
        
        if(!user) return res.status(404).json({message:"Invalid Credentials"});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if(!isPasswordValid) return res.status.json({ message: 'invalid credentials'});
      
        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET) ; 
      
        res.send({ token ,user:{userId: user._id,name:user.name, email:user.email}});

    } catch (err) {
        console.log("err",err);
        res.status(500).json({ message:"failed to login" });
    }

}
module.exports ={ login }; 





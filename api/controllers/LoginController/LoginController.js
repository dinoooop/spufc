const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const User = require('../../models/userSchema');

 const login = async(req,res) =>{
    const  email = req.body.email;
    const  password = req.body.password;
    try {
        
        const user = await User.findOne({ email: email  });
        if(!user) return res.status(404).json({message:"Invalid Credentials"});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if(!isPasswordValid) return res.json({ message: 'invalid credentials'});
      
        const token = jwt.sign({userId: user._id}, 'secretkey') ; 
      
        res.send({ token ,user:{userId: user._id,name:user.name, email:user.email}});

    } catch (err) {
        console.log("err",err);
        res.status(500).json({ message:"failed to login" });
    }

}
module.exports ={ login }; 





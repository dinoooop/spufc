const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const User = require('../../models/userSchema');

 const login = async(req,res) =>{
    const  name = req.body.name;
    const  password = req.body.password;
    try {
        console.log("req.body",req.body);
        const user = await User.findOne({ name: name  });
        if(!user) return res.status(404).json({message:"Invalid Credentials"});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if(!isPasswordValid) return res.status.json({ message: 'invalid credentials'});
      
        const token = jwt.sign({userId: user._id}, 'secretkey') 
        console.log("token",token);
        res.send({ token });

    } catch (err) {
        console.log("err",err);
        res.status(500).json({message:"failed to login"})
    }

}
module.exports ={ login }; 


// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     // Validate request
//     if (!email || !password) {
//       return res.status(400).json({ error: "Email and password are required" });
//     }
  
//     try {
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(401).json({ error: "Invalid email or password" });
//       }
  
//       const isMatch = await user.comparePassword(password);
//       if (!isMatch) {
//         return res.status(401).json({ error: "Invalid email or password" });
//       }
  
//       const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
//       res.json({ token });
//     } catch (err) {
//       console.error('Error during login:', err);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   });


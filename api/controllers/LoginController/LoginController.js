const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const User = require('../../models/userSchema');

// const login = async (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     try {
//         // Find the user by email
//         const user = await User.findOne({ email: email });
//         if (!user) return res.status(404).json({ message: "Invalid Credentials" });

//         // Validate the password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) return res.status(401).json({ message: "Invalid Credentials" });

//         // Generate a JWT token
//         const token = jwt.sign({ userId: user._id }, 'secretkey');

//         // Save the token in the user's record in the database
//         user.token = token;
//         await user.save();

//         // Send the user data along with the token in the response
//         res.json({
//             token,
//             user: {
//                 userId: user._id,
//                 name: user.name,
//                 email: user.email,
//                 token: user.token // Include the token in the user data
//             }
//         });

//     } catch (err) {
//         console.log("Error:", err);
//         res.status(500).json({ message: "Failed to login" });
//     }
// };

 const login = async(req,res) =>{
    const  email = req.body.email;
    const  password = req.body.password;
    try {
        
        const user = await User.findOne({ email: email  });
        if(!user) return res.status(404).json({message:"Invalid Credentials"});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if(!isPasswordValid) return res.status.json({ message: 'invalid credentials'});
      
        const token = jwt.sign({userId: user._id}, 'secretkey') ; 
      
        res.send({ token ,user:{userId: user._id,name:user.name, email:user.email,}});

    } catch (err) {
        console.log("err",err);
        res.status(500).json({message:"failed to login"})
    }

}
module.exports ={ login }; 





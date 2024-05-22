const User = require('../../models/userSchema')
async function handleUserSignup(req,res) {
    const {name,email,password}= req.body;

    await User.create({
        name,
        email,
         password,
    });
   
}

async function getAllUser(req,res) {
        try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
   
}


async function deleteUserById(req,res){
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).send(error);
    }
 
}

module.exports = { handleUserSignup , getAllUser ,deleteUserById }




// Delete a user by ID
// app.delete('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).send({ error: 'User not found' });
//     }
//     res.status(200).send({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
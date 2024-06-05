const User = require('../../models/userSchema')

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

module.exports = { deleteUserById }
const User = require('../../models/userSchema');

const getuserbyID = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  module.exports = { getuserbyID };
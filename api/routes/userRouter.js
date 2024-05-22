const express = require ("express");
const { handleUserSignup , getAllUser,deleteUserById} = require('../controllers/UserController/usersController');

const router = express.Router();

router.post('/',handleUserSignup);
router.get("/allusers",getAllUser);
router.delete('/delete/:id')
module.exports = router;
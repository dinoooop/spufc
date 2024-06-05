const express = require ("express");
const { addNewUser } = require('../controllers/UserController/add_user_controller');
const { deleteUserById } = require('../controllers/UserController/delete_user_controller');
const { getAllUser } = require('../controllers/UserController/get_all_users_controller');
const { updateUser } = require('../controllers/UserController/update_user_controller');
const { getuserbyID } = require('../controllers/UserController/get_single_user_controller');
const router = express.Router();

router.post('/user',addNewUser);
router.get("/users",getAllUser);
router.get("/user/:id",getuserbyID);
router.delete('/user/:id',deleteUserById);
router.put('/user/:id',updateUser);


module.exports = router;
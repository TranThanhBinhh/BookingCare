const express = require("express");
const router = express.Router();
const path = require("path");
import userController from "../controller/userController";


router.post('/login',userController.handleUserLogin);
router.get('/get-all-users',userController.handleGetAllUsers);
router.post('/create-new-user',userController.handleCreateNewUser);
router.delete('/delete-user/:userId',userController.handleDeleteUser);
router.put('/update-user/:userId',userController.handleUpdateUser);
router.get('/get-top-doctor',userController.handleGetAllUsers);


module.exports = router;

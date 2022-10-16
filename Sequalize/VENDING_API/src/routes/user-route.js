import express from "express";
const user_router=express.Router();
import upload from "../middlewares/image-middleware.js";
import userController from '../controllers/user-controller.js';
import tokens from "../middlewares/token.js";

user_router.get('/get-users',tokens.verifyToken,userController.getUsersById);
user_router.get('/get-users-by-role',tokens.verifyToken,userController.getUsersByRole);
user_router.get('/users',tokens.verifyToken,userController.getUsers);
user_router.get('/get-managers',tokens.verifyToken,userController.getManagers);
user_router.get('/get-all-managers',tokens.verifyToken,userController.getAllManagers);
user_router.get('/get-vendors',tokens.verifyToken,userController.getVendors);
user_router.get('/get-all-vendors',tokens.verifyToken,userController.getAllVendors);
user_router.get('/get-super-admins',tokens.verifyToken,userController.getSuperAdmins);
user_router.get('/get-admins',tokens.verifyToken,userController.getAdmins);
user_router.get('/get-all-admins',tokens.verifyToken,userController.getAllAdmins);
user_router.post('/assign-vendors',upload.single(''),tokens.verifyToken,userController.assignVendors);
user_router.post('/assign-machines',upload.single(''),tokens.verifyToken,userController.assignMachines);
user_router.post('/update-info',upload.single('image'),tokens.verifyToken,userController.updateInfo);
user_router.post('/update_password',upload.single(''),tokens.verifyToken,userController.updatePassword);
user_router.delete('/delete/:user_id',tokens.verifyToken,userController.deleteUser);
user_router.get('/:user_id',tokens.verifyToken,userController.getUser);

export default user_router;
import express from "express";
const user_router=express.Router();
import upload from "../middlewares/image-middleware.js";
import userController from '../controllers/user-controller.js';
import tokens from "../middlewares/token.js";
// user_router.use(()=>{

// });
// user_router.get('/users/:user_id/:page/:search_term',tokens.verifyToken,userController.getUsers);
user_router.post('/publications',tokens.verifyToken,userController.addPublication);
user_router.get('/publications',tokens.verifyToken,userController.getPublication);
user_router.get('/followings',tokens.verifyToken,userController.getFollowings);
user_router.get('/followers',tokens.verifyToken,userController.getFollowers);
user_router.get('/users',tokens.verifyToken,userController.getUsers);
user_router.get('/invite-users',tokens.verifyToken,userController.inviteUsers);
user_router.get('/',tokens.verifyToken,userController.getUser);
user_router.get('/:user_id',tokens.verifyToken,userController.getUser);
user_router.post('/update_info',upload.single('image'),tokens.verifyToken,userController.updateInfo);
user_router.post('/update_password',upload.single(''),tokens.verifyToken,userController.updatePassword);
user_router.post('/toggle-follow',tokens.verifyToken,upload.single(''),userController.toggleFollow);

export default user_router;
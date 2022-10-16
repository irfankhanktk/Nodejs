import express from "express";
const group_router=express.Router();

import groupController from '../controllers/group-controller.js';
import upload from "../middlewares/image-middleware.js";
import tokens from "../middlewares/token.js";
// group_router.use(()=>{

// });
group_router.post('/create',upload.single('image'),tokens.verifyToken,groupController.createGroup);
group_router.post('/add-user',upload.single(''),tokens.verifyToken,groupController.addUser);

group_router.get('/groups',tokens.verifyToken,groupController.getAllGroups);

group_router.get('/get_joined_groups/:id/:page',tokens.verifyToken,groupController.getJoinedGroupsById);

group_router.get('/get_un_joined_groups/:id/:page',tokens.verifyToken,groupController.getUnJoinedGroupsById);

group_router.get('/join/:group_id/:user_id',groupController.joinGroup);

group_router.get('/leave/:group_id/:user_id',groupController.leaveGroup);
group_router.get('/delete',groupController.deleteGroup);
group_router.post('/update-group',upload.single(''),tokens.verifyToken,groupController.update_group);

export default group_router;
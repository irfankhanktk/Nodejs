import express from "express";
const message_router=express.Router();

import messageController from '../controllers/message-controller.js';
import upload from "../middlewares/image-middleware.js";
import tokens from "../middlewares/token.js";

//get messages
message_router.get('/:from_id/:to_id/:is_group',tokens.verifyToken,messageController.getMessages);
//update message is_seen status
message_router.get('/updateMessage',tokens.verifyToken,messageController.updateMessageIsSeenStatus);
//send message
message_router.post('/create',upload.single('image'),tokens.verifyToken,messageController.createMessage);

//message_router.get('/messages',tokens.verifyToken,messageController.getAllMessages);
message_router.get('/:id',tokens.verifyToken,messageController.getMessageById);

//get chat list
message_router.get('/chats/:user_id',tokens.verifyToken,messageController.getChats);
//last inserted message
message_router.get('/lastMessage/:from_id/:to_id/:is_group',tokens.verifyToken,messageController.getLastMessage);
//delete a message
message_router.get('/delete/:mids/:is_last_msg/:from_id/:to_id',tokens.verifyToken,messageController.deleteMessages);

export default message_router;
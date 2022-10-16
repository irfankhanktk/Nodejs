import express from "express";
const notification_router=express.Router();

import notificationController from '../controllers/notification-controller.js';
import tokens from "../middlewares/token.js";

//send message
notification_router.post('/create',tokens.verifyToken,notificationController.createNotification);
//get_post_notification by user_id and post_id
notification_router.get('/post_notification',tokens.verifyToken,notificationController.getNotification);
notification_router.get('/:id',tokens.verifyToken,notificationController.getNotificationsById);

export default notification_router;
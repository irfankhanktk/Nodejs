import express from "express";
import upload from "../middlewares/image-middleware.js";
const order_router=express.Router();
import tokens from "../middlewares/token.js";

import orderController from '../controllers/order-controller.js';

order_router.post('/',tokens.verifyToken,upload.single(''),orderController.dispenseItem);
order_router.post('/payment',tokens.verifyToken,upload.single(''),orderController.payment);
order_router.get('/logs',tokens.verifyToken,orderController.getLogs);
order_router.get('/get-orders',tokens.verifyToken,orderController.getAllOrders);
order_router.get('/get-bills',tokens.verifyToken,orderController.getBills);

export default order_router;
import express from "express";
import upload from "../middlewares/image-middleware.js";
const item_router=express.Router();
import tokens from "../middlewares/token.js";

import itemController from '../controllers/item-controller.js';

item_router.post('/',tokens.verifyToken,upload.single(''),itemController.insertItem);
item_router.get('/get-items',tokens.verifyToken,itemController.getAllItems);
item_router.get('/get-counts',tokens.verifyToken,itemController.getCounts);
item_router.get('/dispensed-counts',tokens.verifyToken,itemController.getDispensedCounts);
item_router.get('/get-dispensed-items',tokens.verifyToken,itemController.getDispensedItems);
item_router.post('/update',tokens.verifyToken,upload.single(''),itemController.updateItem);
item_router.post('/update-expiry-qty',tokens.verifyToken,upload.single(''),itemController.updateExpiryQty);
item_router.delete('/',tokens.verifyToken,itemController.deleteItem);

export default item_router;
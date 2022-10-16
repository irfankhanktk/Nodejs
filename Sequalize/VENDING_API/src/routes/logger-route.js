import express from "express";
const logger_router=express.Router();

import loggerController from '../controllers/logger-controller.js';

logger_router.get('/',loggerController.getLogs);

export default logger_router;
import express from "express";
const machine_router=express.Router();
import upload from "../middlewares/image-middleware.js";
import machineController from '../controllers/machine-controller.js';
import tokens from "../middlewares/token.js";

machine_router.post('/',tokens.verifyToken,upload.single('image'),machineController.insertMachine);
machine_router.get('/get-machines',tokens.verifyToken,upload.single(''),machineController.getMachines);
machine_router.get('/get-all-machines',tokens.verifyToken,upload.single(''),machineController.getAllMachines);
machine_router.get('/popular-machines',tokens.verifyToken,machineController.getPopularMachines);
machine_router.get('/get-locations',tokens.verifyToken,upload.single(''),machineController.getLocations);
machine_router.delete('/delete/:machine_id',machineController.deleteMachine);
machine_router.post('/update',tokens.verifyToken,upload.single('image'),machineController.updateMachine);

export default machine_router;
import express from "express";
import upload from "../middlewares/image-middleware.js";
const fingerprint_router=express.Router();
import tokens from "../middlewares/token.js";

import fingerprintController from '../controllers/fingerprint-controller.js';

fingerprint_router.post('/',tokens.verifyToken,upload.single(''),fingerprintController.insertFingerprint);
fingerprint_router.get('/get-fingerprints',tokens.verifyToken,upload.single(''),fingerprintController.getFingerprints);
fingerprint_router.get('/get-all-fingerprints',tokens.verifyToken,upload.single(''),fingerprintController.getAllFingerprints);

export default fingerprint_router;
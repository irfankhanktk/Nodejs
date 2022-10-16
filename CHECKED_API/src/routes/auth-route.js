import express from "express";
import upload from "../middlewares/image-middleware.js";
const auth=express.Router();

import authController from './../controllers/auth-controller.js';
// auth.use(()=>{

// });
auth.post('/register',upload.single('image'),authController.register);
auth.post('/token',upload.single(''),authController.login);
auth.post('/refreshToken',upload.single(''),authController.getRefreshToken);
auth.post('/getOtpByEmail',upload.single(''),authController.getOtp);

export default auth;
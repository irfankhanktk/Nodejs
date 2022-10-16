import express from "express";
import upload from "../middlewares/image-middleware.js";
const auth=express.Router();
import tokens from "../middlewares/token.js";
import authController from './../controllers/auth-controller.js';

auth.post('/register-super',upload.single('image'),authController.registerSuper);
auth.post('/register',tokens.verifyToken,upload.single('image'),authController.register);
auth.post('/token',upload.single(''),authController.login);
auth.post('/refreshToken',upload.single(''),authController.getRefreshToken);

export default auth;
import express from "express";
const like_router=express.Router();

import likeController from '../controllers/like-controller.js';
import tokens from "../middlewares/token.js";
// like_router.use(()=>{

// });
like_router.get('/like-dislike/:user_id_from/:user_id_to/:post_id',tokens.verifyToken,likeController.likeDislike);
like_router.get('/likes',tokens.verifyToken,likeController.getAllLikes);

export default like_router;
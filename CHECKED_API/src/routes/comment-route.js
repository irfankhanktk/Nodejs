import express from "express";
const comment_router=express.Router();
import upload from "../middlewares/image-middleware.js";
import commentController from '../controllers/comment-controller.js';
import tokens from "../middlewares/token.js";
// comment_router.use(()=>{

// });
comment_router.post('/create',upload.single(''),tokens.verifyToken,commentController.create);
//get-comments-post-id
comment_router.get('/comments/:post_id',tokens.verifyToken,commentController.getCommentsByPostId);

export default comment_router;
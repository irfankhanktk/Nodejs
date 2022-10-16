import express from "express";
const post_router=express.Router();

import postController from '../controllers/post-controller.js';
import upload from "../middlewares/image-middleware.js";
import tokens from "../middlewares/token.js";

post_router.get('/delete',tokens.verifyToken,postController.deletePostById);
post_router.post('/create',upload.single('image'),tokens.verifyToken,postController.createPost);
post_router.get('/posts/:user_id/:page',tokens.verifyToken,postController.getAllPosts);
post_router.get('/forum_posts',tokens.verifyToken,postController.getForumPosts);
post_router.get('/:id',tokens.verifyToken,postController.getPostById);

export default post_router;
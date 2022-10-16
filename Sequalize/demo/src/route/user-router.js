const express =require('express');
const { findAllUser, createUser, findUser, removeUser, getFollowers } = require('../controller/user-controller');
const user_router=express.Router();
// auth.use(()=>{

// });
user_router.get('/get-users',findAllUser);
user_router.get('/',findUser);
user_router.post('/',createUser);
user_router.delete('/delete',removeUser);
user_router.delete('/delete',getFollowers);


module.exports= user_router;
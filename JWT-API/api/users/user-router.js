const { createUser, getUsers, getUserById, updateUserById, signin } =require('./user-controller');
const employeeRouter=require('express').Router();
const {checkToken}=require('../../auth/token-validation')
// employeeRouter.use()


employeeRouter.post('/signup',createUser);
employeeRouter.post('/signin',signin);
employeeRouter.get('/getUsers',checkToken,getUsers);
employeeRouter.get('/getUserById/:id',checkToken,getUserById);
employeeRouter.put('/updateUserById/:id',checkToken,updateUserById);

module.exports=employeeRouter;




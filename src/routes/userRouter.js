const { Router } = require('express');
const { getUsersHandler, getUsersByNameHandler, getUserByIdHandler, createUserHandler, updateUserHandler, loginHandler, passwordUserHandler, handleUserByEmail} = require('../handlers/userHandlers');

const userRouter = Router();

userRouter.get('/name/:name', getUsersByNameHandler);
userRouter.get('/name/', getUsersByNameHandler);
userRouter.get('/id/:id', getUserByIdHandler);
userRouter.get('/id/', getUserByIdHandler);
userRouter.get('/', getUsersHandler);
userRouter.post('/login', loginHandler);
userRouter.post('/', createUserHandler);
userRouter.put('/', updateUserHandler) 
userRouter.post('/auth/update', passwordUserHandler) 
userRouter.get('/email', handleUserByEmail)



module.exports = userRouter;
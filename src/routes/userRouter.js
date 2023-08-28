const { Router } = require('express');
const { getUsersHandler, getUsersByNameHandler, getUserByIdHandler, createUserHandler, updateUserHandler, loginHandler } = require('../handlers/userHandlers');

const userRouter = Router();

userRouter.get('/name/:name', getUsersByNameHandler);
userRouter.get('/name/', getUsersByNameHandler);
userRouter.get('/id/:id', getUserByIdHandler);
userRouter.get('/id/', getUserByIdHandler);
userRouter.get('/', getUsersHandler);
userRouter.post('/login', loginHandler);
userRouter.post('/', createUserHandler);
userRouter.put('/', updateUserHandler)



module.exports = userRouter;
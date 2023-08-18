const { Router } = require('express');
const { getUsersHandler, getUserByIdHandler, postUserHandler, putUserHandler } = require('../handlers/userHandlers');

const userRouter = Router();

userRouter.get('/', getUsersHandler);                 
userRouter.get('/:id', getUserByIdHandler);         
userRouter.post('/', postUserHandler);
userRouter.put('/', putUserHandler)              

module.exports = userRouter;


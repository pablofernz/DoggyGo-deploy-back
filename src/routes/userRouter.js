const { Router } = require('express');
const { getUsersHandler, getUsersByNameHandler, getUserByIdHandler, postUserHandler, putUserHandler } = require('../handlers/userHandlers');

const login = require('../controllers/loginControllers')


const userRouter = Router();

userRouter.get('/name/:name', getUsersByNameHandler);
userRouter.get('/name/', getUsersByNameHandler);
userRouter.get('/id/:id', getUserByIdHandler);
userRouter.get('/id/', getUserByIdHandler);
userRouter.get('/', getUsersHandler);
userRouter.post('/', postUserHandler);
userRouter.put('/', putUserHandler)

userRouter.post('/login', login);


module.exports = userRouter;


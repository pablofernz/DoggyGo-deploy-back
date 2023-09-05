const { Router } = require('express');
const { getReviewsHandler,getReviewsByWalkerId,getReviewsByClientId, createReviewHandler } = require('../handlers/reviewHandlers');

const userRouter = Router();

userRouter.get('/', getReviewsHandler);
userRouter.post('/:id', createReviewHandler);
userRouter.get('/walkerId/:id', getReviewsByWalkerId);
userRouter.get('/walkerId/', getReviewsByWalkerId);
userRouter.get('/clientId/:id', getReviewsByClientId);
userRouter.get('/clientId/', getReviewsByClientId);

module.exports = userRouter;
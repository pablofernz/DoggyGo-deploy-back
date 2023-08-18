const { Router } = require('express');
const { getCountriesHandler, getStatesHandler, getCitiesHandler } = require('../handlers/locationHandlers');

const locationRouter = Router();

locationRouter.get('/country', getCountriesHandler);                
locationRouter.get('/state/:country', getStatesHandler);              
locationRouter.get('/city/:state', getCitiesHandler);                 

module.exports = locationRouter;
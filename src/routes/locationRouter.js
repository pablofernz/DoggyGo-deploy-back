const { Router } = require('express');
const { getCountriesHandler, getStatesHandler, getCitiesHandler } = require('../handlers/locationHandlers');

const locationRouter = Router();

locationRouter.get('/countries', getCountriesHandler);                
locationRouter.get('/state/:country', getStatesHandler);              
locationRouter.get('/countries/:country/states/:state/cities', getCitiesHandler);                 

module.exports = locationRouter;
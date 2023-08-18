const { getCountriesController, getStatesController, getCitiesController} = require('../controllers/locationControllers')

//traer paises
const getCountriesHandler = async (req, res) => {
    try {
        const result = await getCountriesController();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// traer estados
const getStatesHandler = async (req, res) => {
    const { country } = req.params;
    try {
        const result = await getStatesController(country);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// traer ciudades
const getCitiesHandler = async (req, res) => {
    const { state } = req.params;
    try {
        const result = await getCitiesController(state);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



module.exports = {
    getCountriesHandler,
    getStatesHandler,
    getCitiesHandler,
}
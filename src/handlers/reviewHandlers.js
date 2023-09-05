const { getReviewsController, getReviewsByWalkerIdController, getReviewsByClientIdController, createReviewController } = require('../controllers/reviewControllers')

//traer todos los users o traerlos por sus nombres
const getReviewsHandler = async (req, res) => {
    try {
        const result = await getReviewsController();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createReviewHandler = async (req, res) => {
    try {
        const walkerId = req.params.id;
        const clientId = req.body.clientId;
        const { rating, comment } = req.body;

        const createReview = await createReviewController(walkerId, clientId, rating, comment);
        res.status(201).json(createReview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const getReviewsByWalkerId = async (req, res) => {
    const walkerId = req.params.id;
    try {
        const result = await getReviewsByWalkerIdController(walkerId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const getReviewsByClientId = async (req, res) => {
    const clientId = req.params.id;
    try {
        const result = await getReviewsByClientIdController(clientId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getReviewsHandler,
    getReviewsByWalkerId,
    getReviewsByClientId,
    createReviewHandler
}
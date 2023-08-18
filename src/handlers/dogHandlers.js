const { createDog, getDogs } = require("../controllers/dogControllers");
const { Dog } = require("../db")

const addDog = async (req, res) => {
    const { name, image, race, age, recomendations } = req.body

    try {
        if (name && image && race && age && recomendations) {
            const newDog = await createDog(name, race, image, age, recomendations)
            return res.status(200).json(newDog)
        } else {
            throw Error("Give me more information to add your dog.")
        }

    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const getAllDogs = async (req, res) => {
    try {
        const dogs = await Dog.findAll()
        if (dogs.length) {
            return res.status(200).json(dogs)
        } else {
            throw Error("No hay perros")
        }
    } catch (error) {
        return res.status(400).json(error.message)
    }
}


module.exports = {
    addDog,
    getAllDogs
}
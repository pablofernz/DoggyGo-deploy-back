const { createDog, getDogs, getBreeds } = require("../controllers/dogControllers");
const { Dog } = require("../db")

const addDog = async (req, res) => {
    const { name, image, size, age, recomendations, breed } = req.body

    try {
        if (name && size && age && breed) {
            const newDog = await createDog(name, size, image, age, recomendations, breed)
            return res.status(200).json(newDog)
        } else {
            throw Error("Necesitamos mas información para añadir tu perro")
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

const getAllBreeds = async (req, res) => {
    const breeds = await getBreeds()

    try {
        if (breeds) {
            return res.status(200).json(breeds)
        } else {
            throw Error("Error")
        }
    } catch (error) {
        return res.status(400).json(error.message)
    }

}
module.exports = {
    addDog,
    getAllDogs,
    getAllBreeds
}

const { createDog, getBreeds } = require("../controllers/dogControllers");
const { Dog } = require("../db")

const addDog = async (req, res) => {
    const { name, image, size, age, recomendations, breed, sex, castrated } = req.body

    try {
        if (name && size && age && breed && sex) {
            const newDog = await createDog(name, size, image, age, recomendations, breed, sex, castrated)
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

const updateDog = async (req, res) => {
    try {
        const dogID = req.params.id
        const { name, image, size, age, recomendations, breed, sex, castrated } = req.body

        await Dog.update({
            name,
            image,
            size,
            age,
            recomendations,
            breed,
            sex,
            castrated
        }, {
            where: {
                id: dogID
            }
        })
        return res.status(200).json("Información del perro actualizada exitosamente")
    } catch (error) {
        res.status(400).send("No se pudo actualizar la información del perro")
    }
}

const deleteDog = async (req, res) => {
    try {
        const dogID = req.params.id
        await Dog.destroy({
            where: {
                id: dogID
            }
        })
        return res.status(200).send("Perro eliminado exitosamente")
    } catch (error) {
        return res.status(400).send("No se pudo eliminar el perro")
    }
}

module.exports = {
    addDog,
    getAllDogs,
    getAllBreeds,
    updateDog,
    deleteDog
}

const { Dog } = require("../db")

const createDog = async (name, race, image, age, recomendations) => {
    const dog = await Dog.create({
        name,
        race,
        image,
        image,
        age,
        recomendations
    })
    return dog
}

const getDogs = async () => {
    const dogs = await Dog.findAll()
    return dogs
}

module.exports = {
    createDog,
    getDogs
}
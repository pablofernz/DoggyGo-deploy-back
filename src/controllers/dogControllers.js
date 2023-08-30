const { Dog } = require("../db")
const axios = require('axios')

const createDog = async (name, size, image, age, recomendations, breed, sex, castrated) => {
    const dog = await Dog.create({
        name,
        size,
        image,
        age,
        recomendations,
        breed,
        sex,
        castrated
    })
    return dog
}


const getBreeds = async () => {

    const breeds = {
        method: 'GET',
        url: 'https://dog-breeds2.p.rapidapi.com/dog_breeds',
        headers: {
            'X-RapidAPI-Key': 'a5a12bed46msh41cfdac644ffedcp167b6cjsn348a3c1513a6',
            'X-RapidAPI-Host': 'dog-breeds2.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(breeds);

        const respuesta = response.data.map(raza => ({
            id: raza.id,
            name: raza.breed
        }))
        return (respuesta);
    } catch (error) {
        return (error);
    }
}
module.exports = {
    createDog,
    getBreeds
}

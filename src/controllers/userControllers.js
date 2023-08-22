const { User } = require('../db')
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');



// Trae todos los users
const getUsersController = async () => {
    const users = await User.findAll();

    if (users.length === 0) {
        throw Error('No registered walkers');
    }

    const arrayUsers = users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            description: user.description,
            birthdate: user.birthdate,
            image: user.image,
            country: user.country,
            state: user.state,
            city: user.city,
            address: user.address,
            phone: user.phone,
            status: user.status,
            suscription: user.suscription,
            rol: user.rol
        }
    });

    return arrayUsers;
}


//Trae usuarios por nombre
const getUsersByNameController = async (name) => {
    if (!name) {
        throw new Error('Enter a name');
    }

    const users = await User.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    });

    if (users.length === 0) {
        throw Error('Walkers not found');
    }

    const arrayUsers = users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            description: user.description,
            birthdate: user.birthdate,
            image: user.image,
            country: user.country,
            state: user.state,
            city: user.city,
            address: user.address,
            phone: user.phone,
            status: user.status,
            suscription: user.suscription,
            rol: user.rol
        }
    });

    return arrayUsers;
}

// trae user por id
const getUserByIdController = async (id) => {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    if (!id) {
        throw new Error('Enter an ID');
    }

    if (!regexExp.test(id)) {
        throw Error('Enter a valid ID');
    }

    const user = await User.findByPk(id);

    return user;
}

// // postea user en la base de datos
// const postUserController = async ({ name, email, password, description, birthdate, image, country, state, city, address, phone,  status, suscription, rol }) => {
//     if (!name || !email || !password || !birthdate || !address || !phone || !description || !country || !state || !city || !rol) {
//         throw Error('All fields are required');
//     }

//     const searchName = await User.findAll({
//         where: { name: name }
//     })

//     if (searchName.length !== 0) throw Error('This User already exist!');

//     let newUser = await User.create({
//         name,
//         email,
//         password,
//         description,
//         birthdate,
//         image,
//         country,
//         state,
//         city,
//         address,
//         phone, 
//         status,
//         suscription,
//         rol 
//     });

//     return newUser;
// }

const postUserController = async (userData) => {
    console.log(userData)
    const { name, email, password, birthdate, address, phone, description, country, state, city, rol } = userData;


    if (!name || !email || !password || !birthdate || !address || !phone || !description || !country || !state || !city || !rol) {
        throw Error('All fields are required')
    }

    const existingUser = await User.findOne({
        where: { email: email }
    })

    console.log(existingUser)
    if (existingUser) throw new Error('This User already exist!')

    const hashedPassword = await bcrypt.hash(password, 10);  // 10 number of salt rounds

    let newUser = await User.create({
        ...userData,
        password: hashedPassword,
    });

    return newUser;
}



// //editar user
// const putUserController = async ({ name, email, password, description, birthdate, image, country, state, city, address, phone, status, suscription, rol }) => {

//     const user = await User.findOne({ where: { email: email } });

//     let updatedUser = await user.update({
//         name,
//         email,
//         password,
//         description,
//         birthdate,
//         image,
//         country,
//         state,
//         city,
//         address,
//         phone,
//         status,
//         suscription,
//         rol
//     });

//     return updatedUser;
// }

const putUserController = async (updates) => {
    const user = await User.findOne({ where: { email: updates.email } });


    if (!user) {
        throw new Error('User not found');
    }

    let updatedUser = await user.update(updates);

    return updatedUser;
};



module.exports = {
    getUsersByNameController,
    getUsersController,
    getUserByIdController,
    postUserController,
    putUserController
}


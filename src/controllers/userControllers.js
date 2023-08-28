const { User } = require('../db')
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
require("dotenv").config();




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

const createUserController = async (userData) => {
    console.log(userData)
    const { name, email, password, birthdate, address, phone, description, country, state, city, rol } = userData;


    if (!name || !email || !password || !birthdate || !address || !phone || !country || !state || !city || !rol) {
        throw Error('All fields are required')
    }

    const emailCheck = await User.findOne({
        where: {
            email: email
        }
    });
    if (emailCheck) throw new Error('This email is already registered!');

    const phoneCheck = await User.findOne({
        where: {
            phone: phone
        }
    });
    if (phoneCheck) throw new Error('This phone number is already registered!');

    const hashedPassword = await bcrypt.hash(password, 10);  // 10 number of salt rounds

    let newUser = await User.create({
        ...userData,
        password: hashedPassword,
    });

    if (newUser) {
        let token = jwt.sign({ id: newUser.id }, JWT_SECRET_KEY, {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
        });
        //send users details
        return { newUser, token };
    } else {
        throw new Error('Details are not correct');
    }

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

const updateUserController = async (updates) => {
    const user = await User.findOne({ where: { email: updates.email } });


    if (!user) {
        throw new Error('User not found');
    }

    let updatedUser = await user.update(updates);

    return updatedUser;
};

// login user
const loginController = async (email, password) => {

    //find a user by their email
    const user = await User.findOne({ where: { email: email } });

    //if user email is found, compare password with bcrypt
    if (user) {
        const isSame = await bcrypt.compare(password, user.password);
        //if password is the same
        //generate token with the user's id and the secretKey in the env file
        if (isSame) {
            const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });
            //send user and token data
            return { user, token };
        } else {
            throw new Error('Authentication failed');
        }
    } else {
        throw new Error('Authentication failed');
    }
};

module.exports = {
    getUsersByNameController,
    getUsersController,
    getUserByIdController,
    createUserController,
    updateUserController,
    loginController
}

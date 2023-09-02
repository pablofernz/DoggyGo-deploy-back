const { User } = require('../db')
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
const sendEmail = require('../utils/mailer')
require("dotenv").config();



// Trae todos los users
const getUsersController = async () => {
    const users = await User.findAll();

    if (users.length === 0) {
        throw Error('No registered walkers');
    }

    return users;
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
            rol: user.rol,
            schedule: user.schedule,
            cpr: user.schedule,
            size: user.rol
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
    let newUser;
    let isComplete = false;
    // if user is signing up with google
    if (userData.googleId) {

        const { googleId, email, name } = userData;
        // set other values to null or default
        const password = 'null';
        const birthdate = '2000-11-11'; // default birthdate
        const address = '';
        const description = null;
        const phone = '';
        const country = '';
        const state = '';
        const city = '';
        const rol = 'Walker';
        const image = '';
        const status = false;
        const suscription = false;
        isComplete = false;

        newUser = await User.create({
            googleId,
            email,
            name,
            password,
            birthdate,
            address,
            description,
            phone,
            country,
            state,
            city,
            rol,
            image,
            status,
            suscription
        });
        console.log("newUser:", newUser)

    } else {
        console.log(userData)
        const { name, email, password, birthdate, address, description, phone, country, state, city, rol } = userData;


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

        if (password !== 'null') {
            const hashedPassword = await bcrypt.hash(password, 10);  // 10 number of salt rounds


            newUser = await User.create({
                ...userData,
                isComplete: true, // if user is signing up with email, isComplete is true;
                password: hashedPassword,
            });
        }

    }
    if (newUser) {

        sendEmail(newUser.email);
        console.log("final:", newUser);

        if (newUser) {
            // add rol so the token contains it and we can use it in the front end
            let token = jwt.sign({ id: newUser.id, rol: newUser.rol }, JWT_SECRET_KEY, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            //send users details
            return { newUser, token };
        } else {
            throw new Error('Details are not correct');
        }
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
        let isSame = false;

        // check if user is signing up with google
        if (user.password === 'null') {
            isSame = true; // no password needed for google sign up
        } else {
            isSame = await bcrypt.compare(password, user.password);
        }

        //if password is the same or user is signing up with google
        //generate token with the user's id and the secretKey in the env file
        if (isSame) {
            const token = jwt.sign({ id: user.id, rol: user.rol }, JWT_SECRET_KEY, {
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

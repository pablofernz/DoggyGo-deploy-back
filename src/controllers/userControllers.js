const { User } = require('../db')


const getUsers = async () => {
    const users = await User.findAll();

    const arrayUsers = users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            description: user.description,
            birthdate: user.birthdate,
            image: user.image,
            country:user.country,
            state:user.state,
            city:user.city,
            address: user.address,
            phone: user.phone,
            status: user.status,
            suscription: user.suscription,
            rol: user.rol
        }
    });
 
    return [ ...arrayUsers ];
}


const getUsersByName = async (name) => {
    try {
        const users = await User.findAll({
            where: { name: name }
        })

        const arrayUsers = users.map(user => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                description: user.description,
                birthdate: user.birthdate,
                image: user.image,
                country:user.country,
                state:user.state,
                city:user.city,
                address: user.address,
                phone: user.phone,
                status: user.status,
                suscription: user.suscription,
                rol: user.rol
            }
        })

        return [ ...arrayUsers ];

    } catch (error) {
        throw Error('Invalid User.')
    }
}


// Trae todos los users o trae por nombre
const getUsersController = (name) => {
    if (!name) return getUsers();
    else return getUsersByName(name);
}


// trae user por id
const getUserByIdController = async (id) => {
    const user = await User.findByPk(id);
    return user;
}

// postea user en la base de datos
const postUserController = async ({ name, email, password, description, birthdate, image, country, state, city, address, phone,  status, suscription, rol }) => {
    if (!name || !email || !password || !birthdate || !address || !phone || !description || !country || !state || !city || !rol) {
        throw Error('All fields are required')
    }

    const searchName = await User.findAll({
        where: { name: name }
    })

    if (searchName.length !== 0) throw Error('This User already exist!')

    let newUser = await User.create({
        name,
        email,
        password,
        description,
        birthdate,
        image,
        country,
        state,
        city,
        address,
        phone, 
        status,
        suscription,
        rol 
    });

    return newUser;
}


//editar user
const putUserController = async ({ name, email, password, description, birthdate, image, country, state, city, address, phone,  status, suscription, rol }) => {

    const user= await User.findOne({ where: { email: email } });

    let updatedUser = await user.update({
        name,
        email,
        password,
        description,
        birthdate,
        image,
        country,
        state,
        city,
        address,
        phone, 
        status,
        suscription,
        rol 
    });

    return updatedUser;
}


module.exports = {
    getUsersController,
    getUserByIdController,
    postUserController,
    putUserController
}


const { getUsersByNameController, getUsersController, getUserByIdController, postUserController, putUserController } = require('../controllers/userControllers')

//traer todos los users o traerlos por sus nombres
const getUsersHandler = async (req, res) => {
    try {
        const result = await getUsersController();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//traer todos los users o traerlos por sus nombres
const getUsersByNameHandler = async (req, res) => {
    try {
        const { name } = req.params;

        const result = await getUsersByNameController(name);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// traer user por id
const getUserByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await getUserByIdController(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// crear user
// const postUserHandler = async (req, res) => {
//     const { name, email, password, description, birthdate, image, country, state, city, address, phone,  status, suscription, rol } = req.body;
//     try {
//         const postUser = await postUserController({ name, email, password, description, birthdate, image, country, state, city, address, phone,  status, suscription, rol });
//         res.status(200).json(postUser);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// }

const postUserHandler = async (req, res) => {
    // console.log(req.body)

    try {
        const postUser = await postUserController(req.body);
        // it's common to use 201 Created for a resource that has been successfully created
        res.status(201).json(postUser);
    } catch (error) {
        console.log(error.message);
        if (error.message === 'All fields are required' || error.message === 'This User already exists!') {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
}



//editar user
// const putUserHandler = async (req, res) => {
//     const { name, email, password, description, birthdate, image, country, state, city, address, phone, status, suscription, rol } = req.body;
//     try {
//         const postUser = await putUserController({ name, email, password, description, birthdate, image, country, state, city, address, phone, status, suscription, rol });
//         res.status(200).json(postUser);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// }

const putUserHandler = async (req, res) => {
    const updates = req.body;
    console.log(updates)
    try {
        const updatedUser = await putUserController(updates);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports = {
    getUsersByNameHandler,
    getUsersHandler,
    getUserByIdHandler,
    postUserHandler,
    putUserHandler
}


const { getUsersByNameController, getUsersController, getUserByIdController, createUserController, updateUserController, loginController } = require('../controllers/userControllers')

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

const createUserHandler = async (req, res) => {
    // console.log(req.body)

    try {
        const createUser = await createUserController(req.body);

        res.cookie("jwt", createUser.token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log("New User", JSON.stringify(createUser.newUser, null, 2));
        console.log("Token:", createUser.token);

        // it's common to use 201 Created for a resource that has been successfully created
        res.status(201).json(createUser.newUser);
    } catch (error) {
        console.log(error.message);
        if (error.message === 'All fields are required' || error.message === 'This email is already registered!' || error.message === 'This phone number is already registered!' || error.message === 'Details are not correct') {
            res.status(409).json({ error: error.message });
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

const updateUserHandler = async (req, res) => {
    const updates = req.body;
    console.log(updates)
    try {
        const updatedUser = await updateUserController(updates);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//loguear usuario
const loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        const login = await loginController(email, password)

        res.cookie("jwt", login.token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log("User", JSON.stringify(login.user, null, 2));
        console.log("Token:", login.token);

        return res.status(201).json(login.user);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};



module.exports = {
    getUsersByNameHandler,
    getUsersHandler,
    getUserByIdHandler,
    createUserHandler,
    updateUserHandler,
    loginHandler
}
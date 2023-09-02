const {
  getAllWalks,
  getWalkById,
  createWalk,
  editWalk,
} = require("../controllers/walkControllers");

// } = require("../controllers/walkControllers");
const getWalksHandler = async (req, res) => {
  try {
    const walks = await getAllWalks();
    if (walks.length) {
      res.status(200).json(walks);
    } else {
      throw Error("There are no walks");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getWalkByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const walkById = await getWalkById(id);
    res.status(200).json(walkById);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createWalkHandler = async (req, res) => {
  const {
    startDate,
    time,
    state,
    duration,
    cost,
    fee,
    total,
    image,
    comment,
    emergency,
  } = req.body;
  try {
    // if (startDate || state || duration || cost || image || comment) {
    //   throw new Error("All fields are required");
    // }
    const newWalk = await createWalk({
      startDate,
      time,
      state,
      duration,
      cost,
      fee,
      total,
      image,
      comment,
      emergency,
    });
    res.status(200).json(newWalk);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editWalkHandler = async (req, res) => {
  const { id } = req.params;
  const {
    startDate,
    time,
    state,
    duration,
    cost,
    fee,
    total,
    image,
    comment,
    emergency,
  } = req.body;
  try {
    const walkEdited = await editWalk({
      id,
      startDate,
      time,
      state,
      duration,
      cost,
      fee,
      total,
      image,
      comment,
      emergency,
    });
    res.status(200).json(walkEdited);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getWalksHandler,
  getWalkByIdHandler,
  createWalkHandler,
  editWalkHandler,
};

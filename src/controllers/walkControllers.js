const { Walk } = require("../db");

const createWalk = async ({
  startDate,
  state,
  duration,
  cost,
  fee,
  image,
  comment,
  emergency,
}) => {
  const newWalk = await Walk.create({
    startDate,
    state,
    duration,
    cost,
    fee,
    image,
    comment,
    emergency,
  });
  return newWalk;
};

const getAllWalks = async () => {
  const walks = await Walk.findAll();
  return walks;
};

const getWalkById = async (id) => {
  const walkById = await Walk.findByPk(id);
  return walkById;
};

const editWalk = async ({
  id,
  startDate,
  state,
  duration,
  cost,
  fee,
  image,
  comment,
  emergency,
}) => {
  const walkFound = await Walk.findByPk(id);
  if (!walkFound) throw new Error("Walk not created");

  const updatedWalk = await Walk.update(
    {
      startDate,
      state,
      duration,
      cost,
      fee,
      image,
      comment,
      emergency,
    },
    {
      where: { id },
      returning: true,
    }
  );

  return updatedWalk;
};

module.exports = { createWalk, getAllWalks, getWalkById, editWalk };

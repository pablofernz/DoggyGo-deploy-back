const { Router } = require("express");
const {
  getWalksHandler,
  getWalkByIdHandler,
  createWalkHandler,
  editWalkHandler,
} = require("../handlers/walkHandlers");

const walkRouter = Router();

walkRouter.get("/", getWalksHandler);

walkRouter.get("/:id", getWalkByIdHandler);

walkRouter.post("/", createWalkHandler);

walkRouter.put("/:id", editWalkHandler);

module.exports = walkRouter;

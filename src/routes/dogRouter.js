const express = require("express")
const { addDog, getAllDogs } = require("../handlers/dogHandlers")

const dogRouter = express.Router()

dogRouter.post("/add", addDog)
dogRouter.get("/get", getAllDogs)

module.exports = dogRouter
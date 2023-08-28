const express = require("express")
const { addDog, getAllDogs, getAllBreeds } = require("../handlers/dogHandlers")

const dogRouter = express.Router()

dogRouter.post("/add", addDog)
dogRouter.get("/get", getAllDogs)
dogRouter.get("/get/breeds", getAllBreeds)


module.exports = dogRouter
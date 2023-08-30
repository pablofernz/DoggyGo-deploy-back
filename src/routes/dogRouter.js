const express = require("express")
const { addDog, getAllDogs, getAllBreeds, updateDog, deleteDog } = require("../handlers/dogHandlers")

const dogRouter = express.Router()

dogRouter.post("/add", addDog)
dogRouter.get("/get", getAllDogs)
dogRouter.get("/get/breeds", getAllBreeds)
dogRouter.put("/update/:id", updateDog)
dogRouter.delete("/delete/:id", deleteDog)

module.exports = dogRouter
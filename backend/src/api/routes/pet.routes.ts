import express from "express"
import requireAuth from "../middleware/auth.middleware"
import { createPet, getPet, getUserPets } from "../controllers/pet.controller"

const petRoutes = express.Router()

petRoutes.post("/", createPet)

petRoutes.get("/user/:id", getUserPets)

petRoutes.get("/single/:id", getPet)

export default petRoutes

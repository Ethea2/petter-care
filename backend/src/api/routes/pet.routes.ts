import express from "express"
import requireAuth from "../middleware/auth.middleware"
import {
    addMedicalRecord,
    addPetWithPic,
    addVisit,
    createPet,
    getMedicalRecords,
    getPet,
    getUserPets
} from "../controllers/pet.controller"

const petRoutes = express.Router()

petRoutes.post("/", createPet)

petRoutes.get("/user/:id", getUserPets)

petRoutes.get("/single/:id", getPet)

petRoutes.post("/medical/:id", addMedicalRecord)

petRoutes.get("/medical/:id", getMedicalRecords)

petRoutes.post("/visit/:id", addVisit)

petRoutes.post("/upload", addPetWithPic)

export default petRoutes

import { Request, Response } from "express"
import Pet from "../../models/pet.model"
import jwt, { JwtPayload } from "jsonwebtoken"
import { UploadedFile } from "express-fileupload"
import fs from "fs"

export const createPet = async (req: Request, res: Response) => {
    try {
        const { name, bday, sex, breed, age } = req.body
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(401).json({ message: "Token required!" })
        }
        const token = authorization.split(" ")[1]
        const { _id } = jwt.verify(token, process.env.SECRET!) as JwtPayload

        const pet = await Pet.addPets(name, breed, bday, _id, sex, age)
        if (!pet) {
            return res.status(401).json({ message: "Pet creation failed" })
        }
        return res.status(200).json({ message: "success", data: pet })
    } catch (e) {
        const result = e as Error
        return res.status(500).json({ message: result.message })
    }
}

export const getUserPets = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const pets = await Pet.getUserPets(id)
        return res.status(200).json({ message: "success", data: pets })
    } catch (e) {
        const result = e as Error
        return res.status(500).json({ message: result.message })
    }
}

export const getPet = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        console.log("TRIALLLLLLL");
        const pet = await Pet.getPet(id)
        console.log("Trial");
        return res.status(200).json({ message: "success", data: pet })
    } catch (e) {
        const result = e as Error
        console.log(e);
        return res.status(500).json({ message: result.message })
    }
}

export const addMedicalRecord = async (req: Request, res: Response) => {
    try {
        const { date, doctor, notes, reason, medication } = req.body
        const { id } = req.params
        const pet = await Pet.addMedications(
            date,
            doctor,
            notes,
            reason,
            medication,
            id
        )
        return res
            .status(200)
            .json({ message: "successfully added", data: pet })
    } catch (e) {
        const result = e as Error
        return res.status(500).json({ message: result.message })
    }
}

export const getMedicalRecords = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const medicalRecords = await Pet.getMedications(id)
        return res
            .status(200)
            .json({ message: "success", data: medicalRecords })
    } catch (e) {
        const result = e as Error
        return res.status(500).json({ message: result.message })
    }
}

export const addVisit = async (req: Request, res: Response) => {
    try {
        const { date, reason, location, doctor } = req.body
        const { id } = req.params
        const visit = await Pet.addVisits(date, location, doctor, reason, id)
        return res.status(200).json({ message: "success", data: visit })
    } catch (e) {
        const result = e as Error
        return res.status(500).json({ message: result.message })
    }
}

export const addPetWithPic = async (req: Request, res: Response) => {
    try {
        const files = req.files
        const { name, bday, sex, breed, age } = req.body
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(401).json({ message: "Token required!" })
        }
        const token = authorization.split(" ")[1]
        const { _id } = jwt.verify(token, process.env.SECRET!) as JwtPayload

        if (!files) {
            return res.status(500).json({ message: "no file received" })
        }

        const img = files.img as UploadedFile
        const picturePath = img.tempFilePath
        const pet = await Pet.addPetsWithPic(
            name,
            breed,
            age,
            bday,
            picturePath,
            _id
        )
        fs.unlink(img.tempFilePath, (err) => {
            if (err) {
                console.error("Error deleting the temporary file:", err)
            } else {
                console.log("Temporary file deleted.")
            }
        })
        return res.status(200).json({ message: "success", data: pet })
    } catch (e) {
        const result = e as Error
        return res.status(500).json({ message: result.message })
    }
}

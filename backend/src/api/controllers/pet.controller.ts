import { Request, Response } from "express"
import Pet from "../../models/pet.model"
import jwt, { JwtPayload } from "jsonwebtoken"

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
        const pet = await Pet.getPet(id)
        return res.status(200).json({ message: "success", data: pet })
    } catch (e) {
        const result = e as Error
        return res.status(500).json({ message: result.message })
    }
}

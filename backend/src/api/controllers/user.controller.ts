import User from "../../models/user.model"
import mongoose from "mongoose"
import { Request, Response } from "express"

export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await User.getUser(id)
        return res.status(200).json(user)
    } catch (error) {
        const result = error as Error
        return res.status(500).json({ message: result.message })
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.getAllUsers()
        return res.status(200).json(users)
    } catch (error) {
        const result = error as Error
        return res.status(500).json({ message: result.message })
    }
}

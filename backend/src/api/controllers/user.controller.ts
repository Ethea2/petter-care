import User from "../../models/user.model"
import mongoose from "mongoose"
import { Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

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

export const editUser = async (req: Request, res: Response) => {
    try {
        const { username, bio } = req.body
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(401).json({ message: "Token required!" })
        }
        const token = authorization.split(" ")[1]
        const { _id } = jwt.verify(token, process.env.SECRET!) as JwtPayload
        const user = await User.editUser(username, bio, _id)
        return res.status(200).json({ message: "success", data: user })
    } catch (error) {
        const result = error as Error
        return res.status(500).json({ message: result.message })
    }
}

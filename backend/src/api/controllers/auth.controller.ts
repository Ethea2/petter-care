import User from "../../models/user.model"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { Request, Response } from "express"

const createToken = (_id: mongoose.Types.ObjectId) => {
    return jwt.sign({ _id }, process.env.SECRET!, { expiresIn: "3w" })
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body
    try {
        const user = await User.login(username, password)
        const token = createToken(user._id)
        return res.status(200).json({token})
    } catch (error) {
        const result = error as Error
        return res.status(400).json({result}).end
    }
}

export const signup = async (req: Request, res: Response) => {
    const { username, password } = req.body

    try {
        const user = await User.signup(username, password)
        return res.status(200)
    } catch (error) {
        const result = error as Error
        return res.status(400).json({result})
    }
}

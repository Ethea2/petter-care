import User from "../../models/user.model"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { Request, Response } from "express"

const createToken = (_id: any) => {
    console.log(process.env.SECRET)
    return jwt.sign({ _id }, process.env.SECRET!, { expiresIn: "3w" })
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body
    try {
        const user = await User.login(username, password)
        const token = createToken(user._id)
        return res.status(200).json({
            token,
            id: user._id
        })
    } catch (error) {
        const result = error as Error
        return res.status(400).json({ message: result.message })
    }
}

export const signup = async (req: Request, res: Response) => {
    const { username, password } = req.body

    try {
        const user = await User.signup(username, password)
        return res.status(200).json({ message: "Signup successful!" })
    } catch (error) {
        const result = error as Error
        return res.status(400).json({ error: result.message })
    }
}

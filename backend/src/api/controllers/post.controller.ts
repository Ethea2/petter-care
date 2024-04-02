import { Request, Response } from "express"
import Post from "../../models/post.model"
import jwt, { JwtPayload } from "jsonwebtoken"
import User from "../../models/user.model"
import { IUser } from "../../types/user.types"
import { Types } from "mongoose"

export const uploadPost = async (req: Request, res: Response) => {
    try {
        const { title, body } = req.body

    // uncomment this out bc this is just for testing : 

    //    const { authorization } = req.headers

    //    if (!authorization) {
        //    return res.status(401).json({ message: "Token required!" })
    //    }

    //    const token = authorization.split(" ")[1]
    //    const { _id } = jwt.verify(token, process.env.SECRET!) as JwtPayload

    //TEST ID
   const _id = "1"
   
        const post = await Post.addPost(_id, title, body)
        return res.status(200).json(post)
    } catch (error) {
        const result = error as Error
        return res.status(500).json({ message: result.message })
    }
}

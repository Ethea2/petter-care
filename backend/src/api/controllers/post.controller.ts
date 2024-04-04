import { Request, Response } from "express"
import Post from "../../models/post.model"
import jwt, { JwtPayload } from "jsonwebtoken"
import User from "../../models/user.model"
import { IUser } from "../../types/user.types"
import { Types } from "mongoose"

import PostModel from '../../models/post.model';

export const uploadPost = async (req: Request, res: Response) => {
    try {
        const { title, body } = req.body
        const { authorization } = req.headers

        if (!authorization) {
            return res.status(401).json({ message: "Token required!" })
        }

        const token = authorization.split(" ")[1]
        const { _id } = jwt.verify(token, process.env.SECRET!) as JwtPayload

        const post = await Post.addPost(_id, title, body)
        return res.status(200).json(post)
 

//        _id: string, title: string, body: string
        // await post.save();
    
        // res.status(201).json(post);
    } catch (error) {
        const result = error as Error
        return res.status(500).json({ message: result.message })
    }
}

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.getAllPosts()
        return res.status(200).json(posts)
    } catch (e) {
        const result = e as Error
        return res.status(500).json({ message: result.message })
    }
}

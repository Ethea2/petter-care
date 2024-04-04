import { Request, Response } from "express"
import Post from "../../models/post.model"
import fs from "fs"
import jwt, { JwtPayload } from "jsonwebtoken"
import { UploadedFile } from "express-fileupload"
import User from "../../models/user.model"
import { IUser } from "../../types/user.types"
import { Types } from "mongoose"

import PostModel from "../../models/post.model"

export const uploadPost = async (req: Request, res: Response) => {
    try {
        const { body } = req.body
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(401).json({ message: "Token required!" })
        }

        const token = authorization.split(" ")[1]
        const { _id } = jwt.verify(token, process.env.SECRET!) as JwtPayload
        const files = req.files

        if (!files) {
            const post = await Post.createPost(_id, body)
            return res.status(200).json(post)
        }

        const img = files.img as UploadedFile
        const picturePath = img.tempFilePath
        const post = await Post.createPost(_id, body, picturePath)

        fs.unlink(img.tempFilePath, (err) => {
            if (err) {
                console.error("Error deleting the temporary file:", err)
            } else {
                console.log("Temporary file deleted.")
            }
        })
        return res.status(200).json(post)
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

export const getAllUserPosts = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const posts = await Post.getAllUserPosts(id)
        return res.status(200).json(posts)
    } catch (e) {
        const result = e as Error
        return res.status(500).json({ message: result.message })
    }
}

export const getSinglePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const post = await Post.getSinglePost(id)
        return res.status(200).json(post)
    } catch (e) {
        const result = e as Error
        return res.status(500).json({ message: result.message })
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const post = await Post.deletePost(id)
        return res.status(200).json({ message: "success", data: post })
    } catch (e) {
        const result = e as Error
        return res.status(500).json({ message: result.message })
    }
}

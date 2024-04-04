import express from "express"
import requireAuth from "../middleware/auth.middleware"
import {
    deletePost,
    getAllPosts,
    getAllUserPosts,
    getSinglePost,
    uploadPost
} from "../controllers/post.controller"

const postRouter = express.Router()

postRouter.post("/upload", uploadPost)

postRouter.get("/", getAllPosts)

postRouter.get("/:id", getAllUserPosts)

postRouter.get("/single/:id", getSinglePost)

postRouter.delete("/:id", deletePost)

export default postRouter

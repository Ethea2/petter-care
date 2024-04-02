import express from "express"
import requireAuth from "../middleware/auth.middleware"
import { getAllPosts, uploadPost } from "../controllers/post.controller"

const postRouter = express.Router()

postRouter.post("/upload", uploadPost)

postRouter.get("/", getAllPosts)

export default postRouter

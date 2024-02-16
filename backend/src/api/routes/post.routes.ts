import express from "express"
import requireAuth from "../middleware/auth.middleware"
import { uploadPost } from "../controllers/post.controller"

const postRouter = express.Router()

postRouter.post("/upload", uploadPost)

export default postRouter

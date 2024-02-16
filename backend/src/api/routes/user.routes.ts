import express from "express"
import requireAuth from "../middleware/auth.middleware"
import { getSingleUser, getUsers } from "../controllers/user.controller"

const userRouter = express.Router()

userRouter.use(requireAuth)

userRouter.get("/", getUsers)

userRouter.get("/:id", getSingleUser)

export default userRouter

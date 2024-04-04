import express from "express"
import requireAuth from "../middleware/auth.middleware"
import {
    editUser,
    getSingleUser,
    getUsers
} from "../controllers/user.controller"

const userRouter = express.Router()

userRouter.get("/", getUsers)

userRouter.get("/:id", getSingleUser)

userRouter.post("/edit", editUser)

export default userRouter

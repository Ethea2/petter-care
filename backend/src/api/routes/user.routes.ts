import express from "express"
import { Request, Response } from "express"
import requireAuth from "../middleware/auth.middleware"

const userRouter = express.Router()

userRouter.use(requireAuth)

userRouter.get("/", (req: Request, res: Response) => {
    res.send("Test")
})

export default userRouter

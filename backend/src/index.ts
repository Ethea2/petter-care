import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import userRouter from "./api/routes/user.routes"
import authRouter from "./api/routes/auth.routes"
import bcrypt from "bcrypt"
import postRouter from "./api/routes/post.routes"
import morgan from "morgan"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 4000

//middlewares
app.use(
    cors({
        origin: process.env.WEB_URL,
        methods: ["GET", "POST", "PATCH", "DELETE"]
    })
)
app.use(express.json())
app.use(morgan("dev"))

//router setup
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/post", postRouter)

//server initialization
mongoose.connect(process.env.MONGODB_URI!).then(() => {
    app.listen(port, () => {
        console.log(
            `Server up and running on port: ${port}! LET'S FUCKING GET THIS CUHZ`
        )
    })
})

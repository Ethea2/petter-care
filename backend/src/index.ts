import express, { Express, NextFunction, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import userRouter from "./api/routes/user.routes"
import authRouter from "./api/routes/auth.routes"
import bcrypt from "bcrypt"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 4000

//middlewares
var corsOptions = function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With"
    )
    next()
}

app.use(corsOptions)

app.use(express.json())

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)

mongoose.connect(process.env.MONGODB_URI!).then(() => {
    app.listen(port, () => {
        console.log(
            `Server up and running on port: ${port}! LET'S FUCKING GET THIS CUHZ`
        )
    })
})

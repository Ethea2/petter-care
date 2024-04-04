import express, { Express, NextFunction, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import userRouter from "./api/routes/user.routes"
import authRouter from "./api/routes/auth.routes"
import bcrypt from "bcrypt"
import postRouter from "./api/routes/post.routes"
import morgan from "morgan"
import petRoutes from "./api/routes/pet.routes"
import fileUpload from "express-fileupload"
import Pet from "./models/pet.model"

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
app.use(
    fileUpload({
        useTempFiles: true
    })
)
app.use(express.json())
app.use(morgan("dev"))

//router setup
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/post", postRouter)
app.use("/api/pet", petRoutes)

//server initialization
mongoose.connect(process.env.MONGODB_URI!).then(() => {
    app.listen(port, () => {
        console.log(
            `Server up and running on port: ${port}! LET'S FUCKING GET THIS CUHZ`
        )
    })
})

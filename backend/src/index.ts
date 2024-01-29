import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 4000

app.get("/", (req: Request, res: Response) => {
    res.send("BOILTER PLATED LAWL!")
})

app.listen(port, () => {
    console.log(
        `Server up and running on port: ${port}! LET'S FUCKING GET THIS CUHZ`
    )
})

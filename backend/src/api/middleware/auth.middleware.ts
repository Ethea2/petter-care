import jwt, { JwtPayload } from "jsonwebtoken"
import User from "../../models/user.model"
import { Request, Response, NextFunction } from "express"
import { IUser } from "../../types/user.types"

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ message: "Token required!" })
    }

    const token = authorization.split(" ")[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET!) as JwtPayload
        const currentTimestamp = Math.floor(Date.now() / 1000)
        if (_id.exp < currentTimestamp) {
            throw new Error("Token expired")
        }

        const user = await User.findOne({ _id }).select("_id")

        if (req.user) {
            req.user = <IUser>user
        }

        next()
    } catch (error) {
        const result = error as Error
        if (result.message === "jwt expired") {
            return res
                .status(401)
                .json({ message: "Request is not authorized" })
        }
        return res.status(401).json({ message: "Request is not authorized" })
    }
}

export default requireAuth

import { Model, Schema, model, Types } from "mongoose"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { IUser } from "../types/user.types"

interface UserModel extends Model<IUser> {
    login(username: string, password: string): IUser
    signup(username: string, password: string): IUser
}

const userSchema = new Schema<IUser, UserModel>(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

userSchema.static(
    "signup",
    async function signup(username: string, password: string) {
        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(password, salt)

        const user = await this.create({ username, password: hash })

        return user
    }
)

userSchema.static(
    "login",
    async function login(username: string, password: string) {
        if (!username || !password) {
            throw Error("All fields must be field")
        }

        const user = await this.findOne({ username })

        if (!user) {
            throw Error("Incorrect username")
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            throw Error("Wrong password!")
        }

        return user
    }
)

const User = model<IUser, UserModel>("User", userSchema)

export default User

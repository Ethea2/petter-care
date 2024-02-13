import { Model, Schema, model, Types } from "mongoose"
import mongoose from "mongoose"
import { IUser } from "../types/user.types"

interface UserModel extends Model<IUser> {
    login(username: string, password: string): IUser
    signup(username: string, password: string): IUser
    getUser(_id: string): IUser
    getAllUsers(): IUser[]
}

export const userSchema = new Schema<IUser, UserModel>(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        picture: {
            type: String,
            default: "temporary default picture"
        },
        pets: [
            {
                type: Types.ObjectId
            }
        ],
        posts: [
            {
                type: Types.ObjectId
            }
        ],
        followers: [
            {
                type: Types.ObjectId
            }
        ],
        following: [
            {
                type: Types.ObjectId
            }
        ]
    },
    { timestamps: true }
)

const User = model<IUser, UserModel>("User", userSchema)

export default User

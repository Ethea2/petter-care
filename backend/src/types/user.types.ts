import { Types } from "mongoose"
import { IPets } from "./pet.types"
import { IPost } from "./post.types"

export interface IUser {
    _id?: Types.ObjectId
    username: string
    password: string
    pets: Types.ObjectId[] | IPets | string
    posts: Types.ObjectId[] | string | IPost
    followers: Types.ObjectId[] | string | IUser
    following: Types.ObjectId[] | string | IUser
    picture: string
}

import { Types } from "mongoose"
import { IPets } from "./pet.types"
import { IPost } from "./post.types"

export interface IUser {
    _id?: Types.ObjectId
    username: string
    password: string
    pets: any[]
    posts: any[]
    followers: any[]
    following: any[]
    picture: string
}

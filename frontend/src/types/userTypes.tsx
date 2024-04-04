import { Types } from "mongoose"

export interface UserType {
    username: string
    _id: Types.ObjectId
    token?: string
}

export interface IUser {
    _id?: Types.ObjectId
    username: string
    password: string
    pets: any[]
    posts: any[]
    followers: any[]
    following: any[]
    picture: string
    bio: string
}

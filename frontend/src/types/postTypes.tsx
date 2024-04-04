import { IUser } from "./userTypes"

export interface IPost {
    body: string
    image?: string
    comments: string[]
    poster: string
    _id: string
}

export interface ResolvedPosts {
    posts: IPost
    user: IUser
}

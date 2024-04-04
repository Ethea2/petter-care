import { Types } from "mongoose"

export interface IPost {
    body: string
    image?: string
    comments: string[]
    poster: string
}

export interface IComment {
    body: string
}

//test for pushe

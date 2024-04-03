import { Types } from 'mongoose';

export interface IPost {
    title: string
    body: string
    image?: string
    upvotes: Types.ObjectId[]
    comments: Types.ObjectId[]
}

export interface IComment {
    body: string
    upvotes: Types.ObjectId[]
}

//test for pushe

export interface IPost {
    title: string
    body: string
    image?: string
    upvotes: string[]
    comments: string[]
}

export interface IComment {
    body: string
    upvotes: string[]
}

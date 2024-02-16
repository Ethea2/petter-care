import { Model, Schema, model, Types } from "mongoose"
import { IPost } from "../types/post.types"

interface PostModel extends IPost {
    addPost(_id: string, title: string, body: string): IPost
}

const postSchema = new Schema<IPost | PostModel>({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    body: {
        type: String,
        required: true
    },
    upvotes: [
        {
            type: Types.ObjectId
        }
    ],
    comments: [
        {
            type: Types.ObjectId
        }
    ]
})

postSchema.static(
    "addPost",
    async function addPost(_id: string, title: string, body: string) {
        //apply the static function for adding posts.
    }
)

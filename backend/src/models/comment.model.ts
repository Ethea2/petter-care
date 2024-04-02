import { Schema, Types, model } from "mongoose"

const commentSchema = new Schema({
    poster_id: {
        type: Types.ObjectId,
        required: true
    },
    body: {
        type: String
    },
    upvotes: [
        {
            type: Types.ObjectId
        }
    ]
})

// Create a model from the schema
const Comment = model("Comment", commentSchema)

export default Comment

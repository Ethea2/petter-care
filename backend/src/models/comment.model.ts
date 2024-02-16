import { Model, Schema, model, Types } from "mongoose"

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

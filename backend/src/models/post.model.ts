import { Model, Schema, model, Types } from "mongoose"
import cloudinary from "../utils/cloudinary"
import { IPost } from "../types/post.types"
import User from "./user.model"

// interface PostModel extends Model<IPost> {
//     addPost(_id: string, title: string, body: string): IPost
//     addPostWithPicture(
//         _id: string,
//         title: string,
//         body: string,
//         picturePath: string
//     ): IPost
// }

interface PostModel extends Model<IPost> {
    addPost(_id: string, title: string, body: string): IPost
    addPostWithPicture(
        _id: string,
        title: string,
        body: string,
        picturePath: string
    ): IPost
    createPost(
        _id: string,
        title: string,
        body: string,
        picturePath?: string
    ): Promise<IPost>
    getAllPosts(): Promise<Array<IPost>>
}

export const postSchema = new Schema<IPost, PostModel>({
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
            type: Number
        }
    ],
    comments: [
        {
            type: Types.ObjectId,
            ref: 'comment'
        }
    ]
})

// additional:
postSchema.static(
    "createPost",
    async function createPost(
        _id: string,
        title: string,
        body: string,
        picturePath?: string
    ) {
        try {
            if (picturePath) {
                const result = await cloudinary.uploader.upload(picturePath, {
                    use_filename: true,
                    folder: "Petter-Care"
                })
                if (!result) {
                    throw Error("Upload failed!")
                }

                const post = await this.create({
                    title,
                    body,
                    image: result.secure_url
                })

                if (!post) {
                    throw Error("Post creation failed!")
                }

                const user = await User.findById(_id)
                if (!user) {
                    throw Error("User not found")
                }

                user.posts.push(post._id)
                user.save()

                return post
            } else {
                // If no picturePath provided, create a post without an image
                const post = await this.create({
                    title,
                    body
                })

                if (!post) {
                    throw Error("Post creation failed!")
                }

                const user = await User.findById(_id)
                if (!user) {
                    throw Error("User not found")
                }

                user.posts.push(post._id)
                user.save()

                return post
            }
        } catch (error) {
            const result = error as Error
            throw Error(result.message)
        }
    }
)

postSchema.static(
    "addPost",
    async function addPost(_id: string, title: string, body: string) {
        //apply the static function for adding posts.
        try {
            const user = await User.findById(_id)
            if (!user) {
                throw Error("The user does not exist")
            }

            const post = await this.create({
                title,
                body
            })

            if (!post) {
                throw Error("The post creation failed")
            }

            user.posts.push(post._id)
            user.save()
            return post
        } catch (error) {
            const result = error as Error
            throw Error(result.message)
        }
    }
)

postSchema.static(
    "addPostWithPicture",
    async function addPostWithPicture(
        _id: string,
        title: string,
        body: string,
        picturePath: string
    ) {
        try {
            const result = await cloudinary.uploader.upload(picturePath, {
                use_filename: true,
                folder: "Petter-Care"
            })
            if (!result) {
                throw Error("Upload failed!")
            }
            const user = await User.findById(_id)
            if (!user) {
                throw Error("User not found")
            }
            const post = await this.create({
                title,
                body,
                image: result.secure_url
            })
            if (!post) {
                throw Error("Post creation failed!")
            }

            return post
        } catch (error) {
            const result = error as Error
            throw Error(result.message)
        }
    }
)

postSchema.static("getAllPosts", async function getAllPosts() {
    try {
        const posts = await this.find({})
        if (!posts) {
            throw Error("There are no posts available!")
        }
        return posts
    } catch (e) {
        const result = e as Error
        throw Error(result.message)
    }
})

const Post = model<IPost, PostModel>("Post", postSchema)
export default Post

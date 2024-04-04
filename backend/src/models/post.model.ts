import { Model, Schema, model, Types } from "mongoose"
import cloudinary from "../utils/cloudinary"
import { IPost } from "../types/post.types"
import User from "./user.model"
import { IUser } from "../types/user.types"

// interface PostModel extends Model<IPost> {
//     addPost(_id: string, title: string, body: string): IPost
//     addPostWithPicture(
//         _id: string,
//         title: string,
//         body: string,
//         picturePath: string
//     ): IPost
// }
//
export interface ResolvedPosts {
    posts: IPost
    user: IUser
}

interface PostModel extends Model<IPost> {
    createPost(_id: string, body: string, picturePath?: string): Promise<IPost>
    getAllPosts(): Array<ResolvedPosts>
    getAllUserPosts(id: string): Array<ResolvedPosts>
    getSinglePost(id: string): ResolvedPosts
    deletePost(id: string): IPost
}

export const postSchema = new Schema<IPost, PostModel>({
    image: {
        type: String
    },
    body: {
        type: String,
        required: true
    },
    comments: [
        {
            type: Types.ObjectId
        }
    ],
    poster: {
        type: String
    }
})

// additional:
postSchema.static(
    "createPost",
    async function createPost(_id: string, body: string, picturePath?: string) {
        let post
        try {
            if (picturePath) {
                const result = await cloudinary.uploader.upload(picturePath, {
                    use_filename: true,
                    folder: "Petter-Care"
                })
                if (!result) {
                    throw Error("Upload failed!")
                }

                post = await this.create({
                    body,
                    image: result.secure_url,
                    poster: _id
                })

                if (!post) {
                    throw Error("Post creation failed!")
                }
            } else {
                // If no picturePath provided, create a post without an image
                post = await this.create({
                    body,
                    poster: _id
                })

                if (!post) {
                    throw Error("Post creation failed!")
                }
            }
            const user = await User.findById(_id)
            if (!user) {
                throw Error("User not found")
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

postSchema.static("getAllPosts", async function getAllPosts() {
    try {
        const posts = await this.find({})
        if (!posts) {
            throw Error("There are no posts available!")
        }
        const resolvePosts = posts.map(async (post: IPost) => {
            const user = await User.findById(post.poster, "username picture")
            return {
                posts: post,
                user: user
            }
        })
        const finalPosts = Promise.all(resolvePosts)
        return finalPosts
    } catch (e) {
        const result = e as Error
        throw Error(result.message)
    }
})

postSchema.static(
    "getAllUserPosts",
    async function getAllUserPosts(id: string) {
        try {
            const user = await User.findById(id)
            if (!user) {
                throw Error("The user does not exist")
                return
            }
            const posts = await this.find({
                _id: {
                    $in: user.posts
                }
            })
            const resolvePosts = posts.map((post) => {
                return {
                    posts: post,
                    user: {
                        _id: user._id,
                        username: user.username,
                        picture: user.picture
                    }
                }
            })

            return resolvePosts
        } catch (e) {
            const result = e as Error
            throw Error(result.message)
        }
    }
)

postSchema.static("getSinglePost", async function getSinglePost(id: string) {
    try {
        const post = await this.findById(id)
        if (!post) {
            throw Error("This post does not exist!")
        }
        const user = await User.findById(post?.poster)
        if (!user) {
            throw Error("This user does not exist")
        }
        return {
            posts: post,
            user: {
                username: user.username,
                picture: user.picture,
                _id: user._id
            }
        }
    } catch (e) {
        const result = e as Error
        throw Error(result.message)
    }
})

postSchema.static("deletePost", async function deletePost(id: string) {
    try {
        const post = await this.findById(id)
        if (!post) {
            throw Error("Post does not exist")
        }
        const user = await User.findById(post.poster)
        if (!user) {
            throw Error("This user does not exist")
        }
        const newPosts = user.posts.filter((item) => item !== post._id)

        user.posts = newPosts
        const deletedPost = await this.findOneAndDelete({ _id: id })
        return deletedPost
    } catch (e) {
        const result = e as Error
        throw Error(result.message)
    }
})

const Post = model<IPost, PostModel>("Post", postSchema)
export default Post

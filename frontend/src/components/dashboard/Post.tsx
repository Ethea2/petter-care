import { Paper } from "@mantine/core"
import { useState } from "react"
import { PiChatTextBold } from "react-icons/pi"

import { Link } from "react-router-dom"
import { ResolvedPosts } from "../../types/postTypes"
import { toast } from "react-toastify"

const Post = ({ post }: { post: ResolvedPosts }) => {
    const loggedUser = JSON.parse(localStorage.getItem("user") as string)

    const deletePost = async () => {
        const res = await fetch(
            `${import.meta.env.VITE_DEFAULT_URL}/api/post/${post.posts._id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${loggedUser.token}`
                }
            }
        )
        if (!res.ok) {
            toast("Something went wrong!", {
                type: "error",
                autoClose: 3000
            })
            return
        }
        toast("Post deletion successful!", {
            type: "success",
            autoClose: 3000
        })
    }

    return (
        <>
            {/* TODO: Darken on hover */}
            <Paper className="bg-white w-auto h-auto rounded-2xl mt-6 shadow-md hover:cursor-pointer hover:brightness-95 transition duration-300 ease-in-out">
                <div className="flex justify-between items-center">
                    <Link to={`/post/${post.posts._id}`}>
                        <div className="flex items-center pt-6 pb-4 px-6">
                            <div className="pr-6">
                                <div className="w-10 lg:w-12 xl:w-16 h-auto">
                                    <img
                                        src="/user-profile.svg"
                                        alt="Profile"
                                    />
                                </div>
                            </div>

                            <div>
                                <Link
                                    to={`/user-profile/${post.user._id}`}
                                    className="text-base lg:text-lg text-black font-bold hover:underline hover:cursor-pointer"
                                >
                                    {post.user.username}
                                </Link>
                            </div>
                        </div>
                    </Link>
                    {loggedUser.id === post.posts.poster && (
                        <button
                            onClick={deletePost}
                            className="relative text-lg text-black border-2 px-2 border-primary mr-5 z-20"
                        >
                            Delete
                        </button>
                    )}
                </div>

                <Link to={`/post/${post.posts._id}`}>
                    <div
                        className="px-6 pb-4"
                        dangerouslySetInnerHTML={{ __html: post.posts.body }}
                    ></div>
                    <div className="h-full w-full flex justify-center items-center">
                        <div className="w-[50%] h-[50%]">
                            {post.posts.image ? (
                                <img src={post.posts.image} />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="flex items-center border-t border-input-grey py-4 px-6">
                        <button className="text-2xl text-black pl-6 pr-2">
                            <PiChatTextBold />
                        </button>
                        <p className="pt-1">2</p>
                    </div>
                </Link>
            </Paper>
        </>
    )
}

export default Post

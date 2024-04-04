import { Paper, Text } from "@mantine/core"
import { useState } from "react"
import { PiChatTextBold } from "react-icons/pi"

import { Link } from "react-router-dom"
import { ResolvedPosts } from "../../types/postTypes"

const Post = ({ post }: { post: ResolvedPosts }) => {
    const [isHeart, setIsHeart] = useState(false)

    return (
        <>
            {/* TODO: Darken on hover */}
            <Link to="/post">
                <Paper className="bg-white w-auto h-auto rounded-2xl mt-6 shadow-md hover:cursor-pointer hover:brightness-95 transition duration-300 ease-in-out">
                    <div className="flex items-center pt-6 pb-4 px-6">
                        <div className="pr-6">
                            <div className="w-10 lg:w-12 xl:w-16 h-auto">
                                <img src="/user-profile.svg" alt="Profile" />
                            </div>
                        </div>

                        <div>
                            <Link
                                to={`user-profile/${post.user._id}`}
                                className="text-base lg:text-lg text-black font-bold hover:underline hover:cursor-pointer"
                            >
                                {post.user.username}
                            </Link>
                        </div>
                    </div>

                    <div
                        className="px-6 pb-4"
                        dangerouslySetInnerHTML={{ __html: post.posts.body }}
                    ></div>

                    {post.posts.image ? <img src={post.posts.image} /> : ""}
                    <div className="flex items-center border-t border-input-grey py-4 px-6">
                        <button className="text-2xl text-black pl-6 pr-2">
                            <PiChatTextBold />
                        </button>
                        <p className="pt-1">2</p>
                    </div>
                </Paper>
            </Link>
        </>
    )
}

export default Post

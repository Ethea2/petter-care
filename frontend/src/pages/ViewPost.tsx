import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { toast } from "react-toastify"
import CommentBox from "../components/dashboard/CommentBox.tsx"
import Post from "../components/dashboard/Post.tsx"
import { ResolvedPosts } from "../types/postTypes.tsx"

const UserProf = () => {
    const { id } = useParams()
    const [post, setPost] = useState<ResolvedPosts>()
    useEffect(() => {
        const fetchPost = async () => {
            const res = await fetch(
                `${import.meta.env.VITE_DEFAULT_URL}/api/post/single/${id}`
            )
            if (!res.ok) {
                toast("Something went wrong", {
                    type: "error",
                    autoClose: 3000
                })
                return
            }
            const json = await res.json()
            setPost(json)
        }
        fetchPost()
    }, [])
    return (
        <>
            <div className="min-h-screen flex px-40 py-10 bg-gradient-to-r from-primary-blue to-accent3-purple">
                <div className="lg:w-[75%] xl:w-[70%] 2xl:w-[80%] pl-12 -mt-6">
                    {post && <Post post={post} />}
                    <CommentBox />
                </div>
            </div>
        </>
    )
}

export default UserProf

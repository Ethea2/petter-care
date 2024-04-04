import { useParams } from "react-router"
import Post from "../dashboard/Post"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { ResolvedPosts } from "../../types/postTypes"

const Filter = () => {
    const { id } = useParams()
    const [posts, setPosts] = useState<ResolvedPosts[]>()
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(
                `${import.meta.env.VITE_DEFAULT_URL}/api/post/${id}`
            )
            if (!res.ok) {
                toast("Something went wrong with getting the posts", {
                    type: "error",
                    autoClose: 3000
                })
                return
            }
            const json = await res.json()
            console.log(json)
            setPosts(json)
        }
        fetchPosts()
    }, [])
    return <>{posts && posts.map((post) => <Post post={post} />)}</>
}

export default Filter

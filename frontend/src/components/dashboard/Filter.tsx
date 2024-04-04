import { Tabs } from "@mantine/core"
import Post from "./Post.tsx"
import { useEffect, useState } from "react"
import { ResolvedPosts } from "../../types/postTypes.tsx"
import { toast } from "react-toastify"

const Filter = () => {
    const [posts, setPosts] = useState<ResolvedPosts[]>()
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(
                `${import.meta.env.VITE_DEFAULT_URL}/api/post`
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
    useEffect(() => console.log(posts), [posts])
    return (
        <>
            <Tabs
                color="black"
                variant="pills"
                radius="xl"
                defaultValue="foryou"
                activateTabWithKeyboard
            >
                <Tabs.List className="pr-6">
                    <Tabs.Tab
                        value="foryou"
                        className="font-semibold text-base duration-300 ease-in-out hover:underline"
                    >
                        For You
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="foryou">
                    {posts?.map((post) => <Post post={post} />)}
                </Tabs.Panel>
            </Tabs>
        </>
    )
}

export default Filter

import { Paper } from "@mantine/core"
import Follow from "../../components/dashboard/Follow.tsx"
import CreatePost from "../../components/dashboard/CreatePost.tsx"
import Filter from "../../components/dashboard/Filter.tsx"
// import Post from "../../components/dashboard/Post.tsx"
import { useEffect } from "react"
import { useAuth } from "../../hooks/useAuth.tsx"
import { useNavigate } from "react-router"

const Dashboard = () => {
    const router = useNavigate()
    const { user } = useAuth()
    useEffect(() => {
        if (!user) {
            router("/sign-in")
        }
    }, [])
    return (
        <>
            <div className="flex px-40 py-10 bg-dirty-white text-black">
                <div className="lg:w-[25%] xl:w-[25%] 2xl:w-[25%] space-y-10">
                    <Paper className="p-8" shadow="lg" radius="lg">
                        <p className="font-bold text-xl">Meet new people</p>
                        <Follow />
                        <Follow />
                        <Follow />
                    </Paper>
                    <Paper className="p-8" shadow="lg" radius="lg">
                        <p className="font-bold text-xl pb-4">
                            Explore popular tags
                        </p>
                        <div className="flex flex-col items-start">
                            <button className="pb-2 hover:text-grey hover:underline">
                                Dogs
                            </button>
                            <button className="pb-2 hover:text-grey hover:underline">
                                Cats
                            </button>
                            <button className="pb-2 hover:text-grey hover:underline">
                                Vaccines
                            </button>
                            <button className="pb-2 hover:text-grey hover:underline">
                                Vets
                            </button>
                            <button className="hover:text-grey hover:underline">
                                Parrots
                            </button>
                        </div>
                    </Paper>
                </div>

                <div className="lg:w-[75%] xl:w-[70%] 2xl:w-[80%] pl-12">
                    <CreatePost />
                    <Filter />
                </div>
            </div>
        </>
    )
}

export default Dashboard

import Follow from "../../components/dashboard/Follow.tsx"
import CreatePost from "../../components/dashboard/CreatePost.tsx"
import Filter from "../../components/dashboard/Filter.tsx"
import Post from "../../components/dashboard/Post.tsx"
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
            <div className="flex w-100 h-100 px-28 py-20 bg-dirty-white text-black">
                <div className="lg:w-[25%] xl:w-[25%] 2xl:w-[25%] space-y-12">
                    <Paper className='pl-5 pt-5 pb-5' shadow="lg" radius="lg">
                        <p className="font-bold text-2xl">Meet new people</p>
                        <Follow />
                        <Follow />
                        <Follow />
                    </Paper>
                    <Paper className='pl-5 pt-5 pb-5' shadow="lg" radius="lg">
                        <p className="font-bold text-2xl pb-4">Explore popular tags</p>
                        <div className="flex flex-col items-start">
                            
                                <button className="pb-2 hover:text-grey hover:underline">Dogs</button>
                                <button className="pb-2 hover:text-grey hover:underline">Cats</button>
                                <button className="pb-2 hover:text-grey hover:underline">Vaccines</button>
                                <button className="pb-2 hover:text-grey hover:underline">Vets</button>
                                <button className="pb-2 hover:text-grey hover:underline">Parrots</button>
                            
                        </div>
                    </Paper>
                </div>
                
                <div className="lg:w-[75%] xl:w-[70%] 2xl:w-[80%] pl-16">
                    <CreatePost />
                    <div>
                        <Filter />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard

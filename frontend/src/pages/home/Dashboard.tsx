import {
  Paper
} from '@mantine/core';

import Follow from '../../components/dashboard/Follow.tsx'
import CreatePost from '../../components/dashboard/CreatePost.tsx'
import Filter from '../../components/dashboard/Filter.tsx'
import Post from '../../components/dashboard/Post.tsx'

const Dashboard = () => {
    return (
        <>
            <div className="border flex w-100 h-100 px-28 py-20 bg-dirty-white text-black">
                <div className="lg:w-[35%] xl:w-[30%] 2xl:w-[20%] space-y-12">
                    <div>
                        <p className="font-bold text-2xl">Meet new people</p>
                        <Follow />
                        <Follow />
                        <Follow />
                    </div>
                    <div>
                        <p className="font-bold text-2xl pb-4">Explore popular tags</p>
                        <div className="flex flex-col items-start">
                            
                                <button className="pb-2 hover:text-grey hover:underline">Dogs</button>
                                <button className="pb-2 hover:text-grey hover:underline">Cats</button>
                                <button className="pb-2 hover:text-grey hover:underline">Vaccines</button>
                                <button className="pb-2 hover:text-grey hover:underline">Vets</button>
                                <button className="pb-2 hover:text-grey hover:underline">Parrots</button>
                            
                        </div>
                    </div>
                </div>
                
                <div className="border lg:w-[75%] xl:w-[70%] 2xl:w-[80%] pl-16">
                    <CreatePost />
                    <Paper>
                        <Filter />
                        <Post />
                        <Post />
                    </Paper>
                </div>
            </div >
        </>
    )
}

export default Dashboard

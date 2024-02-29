import CreatePost from '../../components/dashboard/CreatePost.tsx'
import Post from '../../components/dashboard/Post.tsx'
import ProfileFilter from '../../components/profile/ProfileFilter.tsx'
import ProfileCard from '../../components/profile/ProfileCard.tsx'

const UserProf = () => {
    return (
        <>
            <div className='flex w-screen h-screen px-28 py-20 bg-gradient-to-r from-primary-blue to-accent3-purple'>
                <div className="lg:w-[35%] xl:w-[30%] 2xl:w-[20%] space-y-12">
                    <ProfileCard />
                </div>
                <div className="lg:w-[75%] xl:w-[70%] 2xl:w-[80%] pl-16">
                    <CreatePost />
                    <ProfileFilter />
                    <Post />
                    <Post />
                </div>
            </div>
        </>
    )
}

export default UserProf

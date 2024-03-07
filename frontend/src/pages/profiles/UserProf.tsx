import CreatePost from '../../components/dashboard/CreatePost.tsx'
import ProfileFilter from '../../components/profile/ProfileFilter.tsx'
import ProfileCard from '../../components/profile/ProfileCard.tsx'

const UserProf = () => {
    return (
        <>
            <div className='flex px-40 py-10 bg-gradient-to-r from-primary-blue to-accent3-purple'>
                <div className="lg:w-[25%] xl:w-[25%] 2xl:w-[25%] space-y-10">
                    <ProfileCard />
                </div>
                <div className="lg:w-[65%] xl:w-[75%] 2xl:w-[80%] pl-10">
                    <CreatePost />
                    <div>
                        <ProfileFilter />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProf

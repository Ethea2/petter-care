import ProfileCard from "../components/profile/ProfileCard.tsx"
import Post from "../components/dashboard/Post.tsx"
import { IUser } from "../types/userTypes.tsx"

const UserProf = () => {
    const user = {} as IUser
    return (
        <>
            <div className="min-h-screen flex px-40 py-10 bg-gradient-to-r from-primary-blue to-accent3-purple">
                <div className="lg:w-[25%] xl:w-[25%] 2xl:w-[25%] space-y-10">
                    <ProfileCard user={user} />
                </div>

                <div className="lg:w-[75%] xl:w-[70%] 2xl:w-[80%] pl-12 -mt-6">
                    <Post />

                    <div>
                        <Post />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProf

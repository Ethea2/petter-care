import { IUser } from "../../types/userTypes"

const ProfileCard = ({ user }: { user: IUser | null | undefined }) => {
    return (
        <>
            <div className="w-[100%] h-auto bg-dirty-white rounded-2xl mb-6 shadow-md justify-center">
                <div className="flex justify-center items-center pt-10 pb-5">
                    <div className="flex justify-center items-center h-24 w-24 drop-shadow">
                        <img src={user?.picture} alt="Profile" />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center text-center mx-10">
                    <p className="text-xl font-bold">{user?.username}</p>
                    <p className="pb-10">
                        {user?.bio
                            ? user?.bio
                            : "Create a bio to display here!"}
                    </p>
                </div>
            </div>
        </>
    )
}

export default ProfileCard

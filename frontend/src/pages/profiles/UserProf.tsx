import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { toast } from "react-toastify"
import CreatePost from "../../components/dashboard/CreatePost.tsx"
import ProfileCard from "../../components/profile/ProfileCard.tsx"
import ProfileFilter from "../../components/profile/ProfileFilter.tsx"
import { IUser } from "../../types/userTypes.tsx"

const UserProf = () => {
    const { id } = useParams()
    const [user, setUser] = useState<IUser>()

    const loggedUser = JSON.parse(localStorage.getItem("user") as string)
    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(
                `${import.meta.env.VITE_DEFAULT_URL}/api/user/${id}`
            )
            if (!res.ok) {
                toast("Something went wrong!", {
                    type: "error",
                    autoClose: 3000
                })
                return
            }
            const json = await res.json()
            setUser(json)
        }
        fetchUser()
    }, [])
    return (
        <>
            <div className="flex px-40 py-10 bg-gradient-to-r from-primary-blue to-accent3-purple">
                <div className="lg:w-[25%] xl:w-[25%] 2xl:w-[25%] space-y-10">
                    {user && <ProfileCard user={user} />}
                </div>
                <div className="lg:w-[65%] xl:w-[75%] 2xl:w-[80%] pl-10">
                    {loggedUser.id === user?._id && <CreatePost />}
                    <ProfileFilter />
                </div>
            </div>
        </>
    )
}

export default UserProf

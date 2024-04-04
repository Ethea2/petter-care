import PetCard from "../../components/profile/PetCard.tsx"
import PetRecords from "../../components/profile/PetRecords.tsx"
import PetNotes from "../../components/profile/PetNotes.tsx"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useParams } from "react-router"
import { IPets } from "../../types/petTypes.tsx"

const PetProf = () => {
    const [pet, setPet] = useState<IPets>()
    const user = JSON.parse(localStorage.getItem("user") as string)

    const { id } = useParams()
    useEffect(() => {
        const fetchPets = async () => {
            const res = await fetch(
                `${import.meta.env.VITE_DEFAULT_URL}/api/pet/single/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    }
                }
            )
            if (!res.ok) {
                toast("Failed to fetch pets", {
                    type: "error",
                    autoClose: 3000
                })
                return
            }
            const json = await res.json()
            setPet(json.data)
        }
        fetchPets()
    }, [])
    return (
        <>
            <div className="flex px-40 py-10 h-screen w-screen bg-gradient-to-r from-primary-blue to-accent3-purple">
                <div className="lg:w-[25%] xl:w-[25%] 2xl:w-[25%] space-y-10">
                    {pet && <PetCard pet={pet} />}
                    <PetNotes />
                </div>
                <div className="lg:w-[65%] xl:w-[75%] 2xl:w-[80%] pl-10">
                    {pet && <PetRecords pet={pet} />}
                </div>
            </div>
        </>
    )
}

export default PetProf

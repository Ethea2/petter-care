import PetAcc from "../../components/profile/PetAcc"
import AddPet from "../../components/profile/AddPet"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { IPets } from "../../types/petTypes"

const PetAccess = () => {
    const user = JSON.parse(localStorage.getItem("user") as string)
    const [pets, setPets] = useState<IPets[]>()
    useEffect(() => {
        const fetchPets = async () => {
            const res = await fetch(
                `${import.meta.env.VITE_DEFAULT_URL}/api/pet/user/${user.id}`,
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
            setPets(json.data)
        }
        fetchPets()
    }, [])
    return (
        <>
            <div className="flex justify-center items-center bg-gradient-to-r from-primary-blue to-accent3-purple h-screen">
                {pets?.length === 0
                    ? ""
                    : pets?.map((pet, index) => (
                          <PetAcc
                              name={pet.name}
                              id={pet._id}
                              img={pet.picture}
                              key={index}
                          />
                      ))}
                <AddPet />
            </div>
        </>
    )
}

export default PetAccess

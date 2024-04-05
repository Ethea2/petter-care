import { IPets } from "../../types/petTypes"

const PetCard = ({ pet }: { pet: IPets }) => {
    return (
        <>
            <div className="w-[100%] h-auto bg-dirty-white rounded-2xl mb-6 shadow-md justify-center">
                <div className="flex justify-center items-center pt-10 pb-5">
                    <div className="flex justify-center items-center h-24 w-24 rounded-full drop-shadow">
                        <img
                            src={pet.picture}
                            className="rounded-full h-full w-full object-cover"
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center text-center pb-4">
                    <p className="text-xl font-bold">{pet.name}</p>
                    <p className="text-grey pb-4">{pet.birthday}</p>
                    <p className="pb-2">
                        <strong>Age: </strong> {pet.age} y/o
                    </p>
                    <p className="pb-2">
                        <strong>Breed: </strong> {pet.breed}
                    </p>
                    <p className="pb-2">
                        <strong>Sex: </strong>
                        {pet.sex}
                    </p>
                </div>

                {/* TODO: Add hover effect */}
            </div>
        </>
    )
}

export default PetCard

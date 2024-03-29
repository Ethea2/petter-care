import { PiNotePencilBold } from "react-icons/pi";

const PetCard = () => {
    return (
        <>
            <div className="w-[100%] h-auto bg-dirty-white rounded-2xl mb-6 shadow-md justify-center">
                <div className="flex justify-center items-center pt-10 pb-5">
                    <div className="flex justify-center items-center h-24 w-24 rounded-full drop-shadow">
                        <img src="/default-pet.svg" className="rounded-full h-full w-full object-cover" />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center text-center pb-4">
                    <p className="text-xl font-bold">Leny</p>
                    <p className="text-grey pb-4">September 8, 2022</p>
                    <p className="pb-2"><strong>Age: </strong>2 y/o</p>
                    <p className="pb-2"><strong>Breed: </strong>Beagle</p>
                    <p className="pb-2"><strong>Sex: </strong>Female</p>
                </div>
                <div className="border-t border-input-grey text-base">
                    <button className="w-full p-4 border-input-grey rounded-bl-2xl">
                        <div className="flex flex-col justify-center items-center">
                            <a className="text-3xl text-black pb-2" href="/">
                                <PiNotePencilBold />
                            </a>
                            Edit
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}

export default PetCard;
const PetAcc = ({
    img,
    name,
    id
}: {
    img: string
    name: string
    id: string | undefined
}) => {
    return (
        <>
            <div className="flex flex-col items-center px-5">
                <a href={`/pet-profile/${id}`}>
                    <img
                        src={img}
                        className="w-40 h-40 rounded-full border-4 border-white mb-4 shadow-lg"
                    />
                </a>
                <p className="text-center text-lg text-white font-bold">
                    {name}
                </p>
            </div>
        </>
    )
}

export default PetAcc

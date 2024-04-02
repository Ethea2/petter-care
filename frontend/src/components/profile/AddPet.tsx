const PetAcc = () => {
    return (
        <>
            <div className="flex flex-col items-center px-5">
                <a href="/pet-create">
                    <img src="/add-pet.svg" className="w-40 h-40 rounded-full border-4 border-white mb-4 shadow-lg" />
                </a>
                <p className="text-center text-lg text-white font-bold">Add Pet</p>
            </div>
        </>
    )
}

export default PetAcc;
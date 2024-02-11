const Filter = () => {
    return (
        <>
            <div className="flex items-center mb-6">
                <div className="space-x-6">
                    <button className="w-28 text-dirty-white font-bold bg-black py-2 rounded-2xl">For You</button>
                    <button className="w-28 text-black hover:text-dirty-white hover:font-bold hover:bg-black py-2 rounded-2xl">Following</button>
                </div>
                <div className="ml-auto pr-6">
                    <button>
                        <div className="w-6 h-auto">
                            <img src="/filter.svg" alt="Filter" />
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Filter;
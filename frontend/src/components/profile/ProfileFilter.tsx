const ProfileFilter = () => {
    return (
        <>
            <div className="flex items-center mb-6">
                <div className="space-x-6">
                    <button className="w-28 text-black font-bold bg-accent1-neon-blue py-2 rounded-2xl">For You</button>
                    <button className="w-28 text-dirty-white hover:font-bold hover:text-black hover:bg-accent1-neon-blue py-2 rounded-2xl">Following</button>
                    <button className="w-28 text-dirty-white hover:font-bold hover:text-black hover:bg-accent1-neon-blue py-2 rounded-2xl">Saved</button>
                </div>
            </div>
        </>
    )
}

export default ProfileFilter;
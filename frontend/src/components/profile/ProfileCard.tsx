
const ProfileCard = () => {
    return (
        <>
            <div className="w-[100%] h-auto bg-dirty-white rounded-2xl mb-6 shadow-md justify-center">
                <div className="flex justify-center items-center pt-10 pb-5">
                    <div className="flex justify-center items-center h-24 w-24 drop-shadow">
                        <img src="/user-profile.svg" alt="Profile" />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center text-center mx-10">
                    <p className="text-xl font-bold">Paula Pacheco</p>
                    <p className="text-grey pb-4">@ennxxx</p>
                    <p className="pb-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>

            </div>
        </>
    )
}

export default ProfileCard;
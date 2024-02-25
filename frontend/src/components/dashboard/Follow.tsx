import { Button } from '@mantine/core';


const Follow = () => {
    return (
        <>
            <div className="flex items-center pt-4 mr-12">
                <div className="pr-5">
                    <div className="w-10 lg:w-12 xl:w-16 h-auto">
                        <img src="/user-profile.svg" alt="Profile" />
                    </div>
                </div>
                <div className='pr-6'>
                    <p className="text-base lg:text-lg text-black font-bold">
                        Paula Pacheco
                    </p>
                    <p className="text-xs lg:text-base text-grey">
                        @ennxxx
                    </p>
                </div>
                <Button radius='xl'>
                    Follow
                </Button>
            </div>
        </>
    )
}

export default Follow;
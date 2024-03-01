import { Button } from '@mantine/core';


const Follow = () => {
    return (
        <>
            <div className="flex pt-6">
                <div className="pr-5">
                    <div className="w-12 h-auto">
                        <img src="/user-profile.svg" alt="Profile" />
                    </div>
                </div>
                <div className='pr-6 w-full'>
                    <p className="text-base font-bold">
                        Paula Pacheco
                    </p>
                    <p className="text-base text-grey">
                        @ennxxx
                    </p>
                    <div className="pt-2">
                        <Button radius="xl" className="text-xs">
                            Follow
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Follow;
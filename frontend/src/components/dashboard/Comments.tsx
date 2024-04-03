import { Paper } from "@mantine/core"
import { Link } from 'react-router-dom';
import { PiHeartStraightBold, PiHeartStraightFill } from "react-icons/pi";

import { useState } from "react";

const Comments = () => {
    const [isHeart, setIsHeart] = useState(false);

    return (
        <>
            <Paper className="bg-white w-auto h-auto my-6">
                <div className="flex">
                    <div className="pl-6">
                        <div className="w-10 lg:w-12 xl:w-16 h-auto">
                            <img src="/user-profile.svg" alt="Profile" />
                        </div>
                    </div>
                    <div className="pl-6">
                        <div className="flex items-center">
                            <Link to='user-profile' className="text-xs text-black font-bold hover:underline hover:cursor-pointer">
                                Lanz Lim
                            </Link>
                            <p className="pl-1 text-xs text-grey">@puggleshooba</p>
                        </div>
                        <div>
                            <p className="mt-1 text-lg text-black">pendulum dick sucking.</p>
                        </div>
                        <div className="flex items-center mt-4">
                            <button
                                className="text-2xl text-black hover:text-[#E50000] pr-2 duration-300 ease-in-out"
                                onMouseEnter={() => setIsHeart(true)}
                                onMouseLeave={() => setIsHeart(false)}
                            >
                                {isHeart ? <PiHeartStraightFill /> : <PiHeartStraightBold />}
                            </button>
                            <p className='text-md'>16</p>
                        </div>


                    </div>
                </div>
            </Paper>
        </>
    );
};

export default Comments;
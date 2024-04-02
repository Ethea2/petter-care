import {
  Paper, 
} from '@mantine/core';
import { useState } from "react";
import { PiHeartStraightBold, PiHeartStraightFill, PiChatTextBold, PiBookmarkSimpleBold, PiBookmarkSimpleFill } from "react-icons/pi";

import { Link } from 'react-router-dom';

const Post = () => {
    const [isHeart, setIsHeart] = useState(false);
    const [isBookmark, setIsBookmark] = useState(false);

    return (
        <>
            {/* TODO: Darken on hover */}
            <Link to='/post'>
                <Paper className="bg-white w-auto h-auto rounded-2xl mt-6 shadow-md hover:cursor-pointer hover:brightness-95 transition duration-300 ease-in-out">
                    <div className="flex items-center pt-6 pb-4 px-6">

                        <div className="pr-6">
                            <div className="w-10 lg:w-12 xl:w-16 h-auto">
                                <img src="/user-profile.svg" alt="Profile" />
                            </div>
                        </div>

                        <div>
                            <Link to='user-profile' className="text-base lg:text-lg text-black font-bold hover:underline hover:cursor-pointer">
                                Paula Pacheco
                            </Link>
                            <p className="text-xs lg:text-base text-grey">@ennxxx</p>
                        </div>

                    </div>

                    <div className="px-6 pb-4">
                        <p>I'd sacrifice myself for a cat.</p>
                    </div>

                    <div className="flex items-center border-t border-input-grey py-4 px-6">
                        <button
                            className="text-2xl text-black hover:text-[#E50000] pr-2 duration-300 ease-in-out"
                            onMouseEnter={() => setIsHeart(true)}
                            onMouseLeave={() => setIsHeart(false)}
                        >
                            {isHeart ? <PiHeartStraightFill /> : <PiHeartStraightBold />}
                        </button>

                        <p className='pt-1'>16</p>

                        <button className="text-2xl text-black pl-6 pr-2">
                            <PiChatTextBold />
                        </button>
                        <p className='pt-1'>2</p>
                    </div>

                </Paper>
            </Link>
        </>
    );
};

export default Post;


import { useState } from "react";
import { PiHeartStraightBold, PiHeartStraightFill, PiChatTextBold, PiBookmarkSimpleBold, PiBookmarkSimpleFill } from "react-icons/pi";

const Post = () => {
    const [isHeart, setIsHeart] = useState(false);
    const [isBookmark, setIsBookmark] = useState(false);

    return (
        <>
            <div className="bg-white w-auto h-auto rounded-2xl mb-6 shadow-md border-x-indigo-500">
                <div className="flex items-center pt-6 pb-4 px-6">
                    <div className="pr-6">
                        <div className="w-10 lg:w-12 xl:w-16 h-auto">
                            <img src="/user-profile.svg" alt="Profile" />
                        </div>
                    </div>
                    <div>
                        <p className="text-base lg:text-lg text-black font-bold">
                            Paula Pacheco
                        </p>
                        <p className="text-xs lg:text-base text-grey">@ennxxx</p>
                    </div>

                    <button className="text-xs ml-auto w-24 p-2 bg-primary-blue font-bold text-dirty-white hover:bg-black rounded-2xl">
                        Follow
                    </button>
                </div>
                <div className="px-6 pb-4">
                    <p>I'd sacrifice myself for a cat.</p>
                </div>
                <div className="flex items-center border-t border-input-grey py-4 px-6">
                    <button
                        className="text-2xl text-black hover:text-[#E50000] pr-2"
                        onMouseEnter={() => setIsHeart(true)}
                        onMouseLeave={() => setIsHeart(false)}
                    >
                        {isHeart ? <PiHeartStraightFill /> : <PiHeartStraightBold />}
                    </button>
                    <p>16 likes</p>
                    <button className="text-2xl text-black pl-6 pr-2">
                        <PiChatTextBold />
                    </button>
                    <p>2 comments</p>
                    <button
                        className="text-3xl text-black hover:text-[#EFBE69] pr-2 ml-auto"
                        onMouseEnter={() => setIsBookmark(true)}
                        onMouseLeave={() => setIsBookmark(false)}
                    >
                        {isBookmark ? <PiBookmarkSimpleFill /> : <PiBookmarkSimpleBold />}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Post;


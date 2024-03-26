import React, { useState } from 'react';
import { PiImageBold, PiArrowCircleRightFill, PiHeartStraightBold, PiChatTextBold, PiBookmarkSimpleBold, PiHeartStraightFill, PiBookmarkSimpleFill } from "react-icons/pi";

const CreatePost = () => {
    const [postContent, setPostContent] = useState('');
    const [posts, setPosts] = useState([]); 
    //hover states lang for the icons 
    const [isHeart, setIsHeart] = useState(false); 
    const [isBookmark, setIsBookmark] = useState(false); 

    const handleInputChange = (event) => {
        setPostContent(event.target.value);
    }

    const addNewPost = () => {
        const newPost = { content: postContent };
        setPosts([newPost, ...posts]);
        setPostContent('');
    };

    return (
        <div>
            <div className="flex bg-dirty-white w-full h-auto rounded-2xl space-x-6 p-6 mb-8 shadow-md">
                <div>
                    <div className="w-10 lg:w-12 xl:w-16 h-auto">
                        <img src="/user-profile.svg" alt="Profile" />
                    </div>
                </div>
                <div className="flex items-center w-full h-auto rounded-2xl bg-input-grey py-2 px-6">
                    <input
                        type="text"
                        className="text-base text-grey placeholder-grey w-full bg-[#E2E5E6] outline-none"
                        placeholder="Start a post..."
                        value={postContent}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex items-center space-x-4 text-4xl text-primary-blue">
                    <PiImageBold />
                    <button onClick={addNewPost}>
                        <PiArrowCircleRightFill />
                    </button>
                </div>
            </div>

            {/* this will render each post that the usar will create/post */}
            {posts.map((post, index) => (
                <div key={index} className="bg-dirty-white w-full h-auto rounded-2xl mb-6 mt-2 shadow-md">
                    <div className="flex items-center pt-6 pb-4 px-6">
                        <div className="pr-6">
                            <div className="w-10 lg:w-12 xl:w-16 h-auto">
                                <img src="/user-profile.svg" alt="Profile" />
                            </div>
                        </div>
                        <div>
                            <p className="text-base lg:text-lg text-black font-bold">Paula Pacheco</p>
                            <p className="text-xs lg:text-base text-grey">@ennxxx</p>
                        </div>
                        <button className="text-xs ml-auto w-24 p-2 bg-primary-blue font-bold text-dirty-white hover:bg-black rounded-2xl">Follow</button>
                    </div>
                    <div className="px-6 pb-4">
                        <p>{post.content}</p>
                    </div>
                    <div className="flex items-center border-t border-input-grey py-4 px-6">
                        <button
                            className="text-3xl text-black hover:text-[#E50000] pr-2"
                            onMouseEnter={() => setIsHeart(true)}
                            onMouseLeave={() => setIsHeart(false)}
                        >
                            {isHeart ? <PiHeartStraightFill /> : <PiHeartStraightBold />}
                        </button>
                        <p># of likes placeholder likes</p>
                        <button className="text-3xl text-black pl-6 pr-2">
                            <PiChatTextBold />
                        </button>
                        <p># of comments placeholder comments</p>
                        <button
                            className="text-3xl text-black hover:text-[#EFBE69] pr-2 ml-auto"
                            onMouseEnter={() => setIsBookmark(true)}
                            onMouseLeave={() => setIsBookmark(false)}
                        >
                            {isBookmark ? <PiBookmarkSimpleFill /> : <PiBookmarkSimpleBold />}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CreatePost;

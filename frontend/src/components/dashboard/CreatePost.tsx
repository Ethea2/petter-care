import { PiImageBold, PiArrowCircleRightFill } from "react-icons/pi";

const CreatePost = () => {
    return (
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
                />
            </div>
            <div className="flex items-center space-x-4 text-4xl text-primary-blue">
                <PiImageBold />
                <PiArrowCircleRightFill />
            </div>
        </div>
    );
};

export default CreatePost;

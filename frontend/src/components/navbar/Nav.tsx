import { AiFillCaretDown } from "react-icons/ai";
import { PiMagnifyingGlassBold, PiHouseFill, PiBellFill } from "react-icons/pi";

const Nav = () => {
    return (
        <>
            <div className="flex items-center w-full h-auto bg-dirty-white py-3 drop-shadow-md">
                <div className="w-60 h-auto pl-4 pr-6 hover:brightness-75 cursor-pointer transition duration-400 ease-in-out">
                    <img src="/logo.svg" alt="Logo" />
                </div>
                <div className="flex items-center w-full h-auto rounded-full bg-input-grey py-2 px-4">
                    <div className="flex items-center pr-2 text-xl ">
                        <PiMagnifyingGlassBold />
                    </div>
                    <input
                        type="text"
                        className="text-base text-grey placeholder-grey w-full bg-[#E2E5E6] outline-none"
                        placeholder="Search"
                    />
                </div>
                <div className="flex items-center px-5 space-x-6 text-3xl text-primary-blue">
                    <PiHouseFill className="hover:brightness-75 cursor-pointer transition duration-400 ease-in-out"/>
                    <PiBellFill className="hover:brightness-75 cursor-pointer transition duration-400 ease-in-out" />
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-auto">
                            <img src="/user-profile.svg" alt="Profile" />
                        </div>
                        <AiFillCaretDown className="hover:brightness-75 cursor-pointer transition duration-400 ease-in-out"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav;
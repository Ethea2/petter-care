import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { PiMagnifyingGlassBold, PiHouseFill, PiBellFill } from "react-icons/pi";

const Nav = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <div className="flex items-center w-full h-auto bg-dirty-white py-3 drop-shadow-md relative z-50">
                <a className="w-60 h-auto pl-4 pr-6 hover:brightness-75 cursor-pointer transition duration-400 ease-in-out" href='/'>
                    <img src="/logo.svg" alt="Logo" />
                </a>
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
                    <PiHouseFill className="hover:brightness-75 cursor-pointer transition duration-400 ease-in-out" />
                    <PiBellFill className="hover:brightness-75 cursor-pointer transition duration-400 ease-in-out" />
                    <div className="flex items-center space-x-3 relative">
                        <a className="w-10 h-auto" href='/user-profile'>
                            <img src="/user-profile.svg" alt="Profile" />
                        </a>
                        <div className="dropdown dropdown-end ml-4">
                            <label tabIndex={0} onClick={toggleDropdown}>
                                <AiFillCaretDown className="hover:brightness-75 cursor-pointer transition duration-400 ease-in-out" />
                            </label>
                            {isDropdownOpen && (
                                <ul tabIndex={0} className="absolute px-4 pt-2 pb-4 bg-white rounded-md w-40 top-10 right-0">
                                    <li>
                                        <a href='/user-profile' className="text-sm text-black">
                                            View Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/' className="text-sm text-black">
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/' className="text-sm text-black">
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav;

import { AiOutlineSearch, AiFillCaretDown } from "react-icons/ai";
import { BsBellFill, BsFillHouseDoorFill } from "react-icons/bs";

const Nav = () => {
    return (
        <>
            <div className="flex items-center w-full h-auto bg-dirty-white py-3 drop-shadow-md">
                <div className="w-60 h-auto pl-4 pr-6">
                    <img src="/logo.svg" alt="Logo" />
                </div>
                <div className="flex items-center w-4/6 min-w-2/6 h-11 rounded-full bg-input-grey p4y-2 px-4">
                    <div className="flex items-center pr-2 text-xl">
                        <AiOutlineSearch />
                    </div>
                    <input
                        type="text"
                        className="text-base text-grey placeholder-grey w-full bg-transparent outline-none"
                        placeholder="Search"
                    />
                </div>
                <div className="flex items-center px-5 space-x-6 text-3xl text-primary-blue">
                    <BsFillHouseDoorFill />
                    <BsBellFill />
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-auto">
                            <img src="/user-profile.svg" alt="Profile" />
                        </div>
                        <AiFillCaretDown />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav;
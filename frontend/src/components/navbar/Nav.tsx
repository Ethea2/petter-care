import { useState } from "react";
import { TextInput, ActionIcon, rem, Menu} from '@mantine/core';
  
import { IconSearch, IconArrowRight, IconLogout, IconSettings, IconMessageCircle} from '@tabler/icons-react';


import UserButton from "./UserButton";
import { Link } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai"
import { PiMagnifyingGlassBold, PiHouseFill, PiBellFill } from "react-icons/pi"

const Nav = () => {
    return (
        <>
            <div className="sticky top-0 flex items-center w-full h-auto bg-dirty-white py-3 drop-shadow-md relative z-50 justify-between">

                {/* Logo and Search*/}
                <div className='flex w-95'>
                    <a className="w-60 h-auto pl-4 pr-6 hover:brightness-75 cursor-pointer transition duration-400 ease-in-out" href='/'>
                        <img src="/logo.svg" alt="Logo" />
                    </a>

                    <TextInput
                        className="w-1/2"
                        radius="xl"
                        size="md"
                        placeholder="Search"
                        rightSectionWidth={42}
                        leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                        rightSection={
                            <ActionIcon size={32} radius="xl" variant="filled">
                            <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                            </ActionIcon>
                        }
                    />
                </div>

                

                    {/* Right */}

                    <div className="flex items-center space-x-6 text-3xl text-primary-blue mr-3">

                        <PiHouseFill className="hover:brightness-75 cursor-pointer transition duration-400 ease-in-out" />
                        <PiBellFill className="hover:brightness-75 cursor-pointer transition duration-400 ease-in-out" />

                        <div className="flex items-center -mt-2">
                            <Menu trigger="hover" position="bottom-end">
                                <Menu.Target>

                                    <Link to='/user-profile'>
                                        <UserButton
                                        className="hover:brightness-75    "
                                        image="../../../public/user-profile.svg"
                                        name="Paula"
                                        username="ennxxx"/>
                                    </Link>
                                    
                                </Menu.Target>
                                
                                <Menu.Dropdown>
                                    <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                                        Settings
                                    </Menu.Item>

                                    <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
                                        Messages
                                    </Menu.Item>
                                
                                    <Menu.Divider />

                                    
                                    <Menu.Item
                                        color="red"
                                        leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}>
                                        Logout
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Nav;


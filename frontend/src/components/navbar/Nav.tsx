import { useDisclosure } from '@mantine/hooks';
import { rem, Menu, Modal, Button, TextInput, Textarea } from "@mantine/core"

import {
    IconLogout,
    IconSettings,
} from "@tabler/icons-react"

import UserButton from "./UserButton"
import { Link } from "react-router-dom"
import { PiHouseFill, PiDogFill, PiCatFill } from "react-icons/pi"

const Nav = () => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>  
            <Modal opened={opened} onClose={close} title="Edit profile" centered>
                <TextInput
                    className='mb-3'
                    label="User Name"
                    placeholder="Your username"
                />

                <Textarea
                    className='mb-3'
                    label="Bio"
                    placeholder="Your bio"
                />


                <div className="mt-4 flex justify-end">
                    <Button
                        className="rounded-2xl duration-300 ease-in-out"
                        color="primary-blue"
                    >
                        Save
                    </Button>
                </div>
            </Modal>

            <div className="sticky top-0 flex items-center w-full h-auto bg-dirty-white py-3 drop-shadow-md z-50 justify-between">
                <div className="flex w-95">
                    <a
                        className="w-60 h-auto pl-4 pr-6 hover:brightness-75 cursor-pointer transition duration-400 ease-in-out"
                        href="/"
                    >
                        <img src="/logo.svg" alt="Logo" />
                    </a>
                </div>

                <div className="flex items-center space-x-6 text-3xl text-primary-blue mr-3">
                    <Link to="/dashboard">
                        <PiHouseFill 
                            className="hover:brightness-75 cursor-pointer transition duration-400 ease-in-out" />
                    </Link>

                    <Link to="/pet-access"
                        className="flex hover:brightness-75 cursor-pointer transition duration-400 ease-in-out"
                        >
                        <PiDogFill />
                        <PiCatFill />
                    </Link>
                    

                    <div className="flex items-center -mt-2">
                        <Menu trigger="hover" position="bottom-end">
                            <Menu.Target>
                                <Link to="/user-profile">
                                    <UserButton
                                        className="hover:brightness-75    "
                                        image="/user-profile.svg"
                                        name="Paula"
                                        username="ennxxx"
                                    />
                                </Link>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item onClick={open}
                                    leftSection={
                                        <IconSettings
                                            style={{
                                                width: rem(14),
                                                height: rem(14)
                                            }}
                                        />
                                    }
                                >
                                    Edit Profile
                                </Menu.Item>


                                <Menu.Divider />

                                <Menu.Item
                                    color="red"
                                    leftSection={
                                        <IconLogout
                                            style={{
                                                width: rem(14),
                                                height: rem(14)
                                            }}
                                        />
                                    }
                                >
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

export default Nav

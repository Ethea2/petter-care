import { Button, Menu, Modal, TextInput, Textarea, rem } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

import { IconLogout, IconSettings } from "@tabler/icons-react"

import { useEffect, useState } from "react"
import { PiCatFill, PiDogFill, PiHouseFill } from "react-icons/pi"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { IUser } from "../../types/userTypes"
import UserButton from "./UserButton"

const Nav = () => {
    const [opened, { open, close }] = useDisclosure(false)
    const router = useNavigate()
    const loggedUser = JSON.parse(localStorage.getItem("user") as string)
    const [user, setUser] = useState<IUser>()
    const [username, setUsername] = useState(loggedUser?.username)
    const [bio, setBio] = useState("")
    useEffect(() => {
        if (!loggedUser) {
            router("/sign-in")
            toast("You must be signed in", {
                type: "warning",
                autoClose: 5000
            })
        }
        const fetchUser = async () => {
            const res = await fetch(
                `${import.meta.env.VITE_DEFAULT_URL}/api/user/${loggedUser.id}`
            )
            if (!res.ok) {
                toast("Something went wrong!", {
                    type: "error",
                    autoClose: 3000
                })
                return
            }
            const json = await res.json()
            setUser(json)
        }
        fetchUser()
    }, [])

    const logout = async () => {
        localStorage.removeItem("user")
        router("/sign-in")
    }
    const submitForm = async () => {
        const res = await fetch(
            `${import.meta.env.VITE_DEFAULT_URL}/api/user/edit/`,
            {
                method: "POST",
                body: JSON.stringify({ username, bio }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${loggedUser.token}`
                }
            }
        )
        if (!res.ok) {
            toast("Edit profile failed!", { type: "error", autoClose: 3000 })
            return
        }
        window.location.reload()
    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title="Edit profile"
                centered
            >
                <TextInput
                    className="mb-3"
                    label="User Name"
                    placeholder="Your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <Textarea
                    className="mb-3"
                    label="Bio"
                    placeholder="Your bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />

                <div className="mt-4 flex justify-end">
                    <Button
                        className="rounded-2xl duration-300 ease-in-out"
                        color="primary-blue"
                        onClick={submitForm}
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
                        <PiHouseFill className="hover:brightness-75 cursor-pointer transition duration-400 ease-in-out" />
                    </Link>

                    <Link
                        to="/pet-access"
                        className="flex hover:brightness-75 cursor-pointer transition duration-400 ease-in-out"
                    >
                        <PiDogFill />
                        <PiCatFill />
                    </Link>

                    <div className="flex items-center -mt-2">
                        <Menu trigger="hover" position="bottom-end">
                            <Menu.Target>
                                <Link to={`/user-profile/${user?._id}`}>
                                    <UserButton
                                        className="hover:brightness-75    "
                                        image={user?.picture}
                                        name={user?.username}
                                    />
                                </Link>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item
                                    onClick={open}
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
                                    onClick={logout}
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

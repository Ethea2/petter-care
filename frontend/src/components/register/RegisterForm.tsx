import {
    TextInput,
    PasswordInput,
    Checkbox,
    Paper,
    Title,
    Group,
    Button
} from "@mantine/core"

import { useState } from "react"
import { Link } from "react-router-dom"
import useRegister from "../../hooks/useRegister"
import { toast } from "react-toastify"

const RegisterForm = () => {
    const [username, setUsername] = useState<string>()
    const [password, setPassowrd] = useState<string>()
    const [confirm, setConfirm] = useState<string>()
    const [email, setEmail] = useState<string>()
    const { register } = useRegister()

    const testString = (string: string) => {
        const regex = /^[a-zA-Z0-9]+$/
        return regex.test(string)
    }

    const submit = async () => {
        if (!email || !username || !password || !confirm) {
            return toast("Please complete all the necessary fields!", {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                type: "error"
            })
        }
        if (confirm !== password) {
            return toast("Please make sure your passwords match!", {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                type: "error"
            })
        }
        if (!testString(password)) {
            return toast(
                "Please don't include special characters in the password!",
                {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    type: "error"
                }
            )
        }
        await register(username, password)
    }

    return (
        <>
            <Paper className="px-20 py-10 w-100" shadow="lg" radius="lg">
                <img
                    className="mx-auto pr-4 mb-8 w-[70%] hover:brightness-75 cursor-pointer transition duration-400 ease-in-out"
                    src="/logo.svg"
                    alt="Logo"
                />

                <Title className="text-3xl" ta="center">
                    Register your account
                </Title>

                <TextInput
                    className="mt-8"
                    variant="filled"
                    label="User Name"
                    placeholder="Your username"
                    radius="md"
                    required
                    error=""
                    onChange={(e) => setUsername(e.target.value)}
                    // TODO: Put error message here
                />

                <TextInput
                    variant="filled"
                    label="Email"
                    placeholder="Your email"
                    radius="md"
                    mt="md"
                    required
                    error=""
                    onChange={(e) => setEmail(e.target.value)}
                    // TODO: Put error message here
                />

                <PasswordInput
                    variant="filled"
                    label="Password"
                    placeholder="Your password"
                    radius="md"
                    mt="md"
                    required
                    error=""
                    onChange={(e) => setPassowrd(e.target.value)}
                    // TODO: Put error message here
                />

                <PasswordInput
                    variant="filled"
                    label="Password"
                    placeholder="Your password"
                    radius="md"
                    mt="md"
                    required
                    error=""
                    onChange={(e) => setConfirm(e.target.value)}
                    // TODO: Put error message here
                />
                <Group justify="end" mt="lg">
                    <Checkbox />
                    <p className="text-sm -ml-1">
                        {" "}
                        I agree to the Privacy Policy{" "}
                    </p>
                </Group>

                <div className="mt-14">
                    <Button
                        className="rounded-2xl duration-300 ease-in-out"
                        color="primary-blue"
                        fullWidth
                        onClick={submit}
                    >
                        Register
                    </Button>
                </div>

                <Group mt="lg" className="justify-center">
                    <p className="text-sm"> Have an account?</p>
                    <Link
                        to="/sign-in"
                        className="text-sm font-bold -ml-3 text-primary-blue hover:underline decoration-2 cursor-pointer"
                    >
                        Sign in
                    </Link>
                </Group>
            </Paper>
        </>
    )
}

export default RegisterForm

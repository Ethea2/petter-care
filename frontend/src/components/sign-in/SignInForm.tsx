import {
    Anchor,
    Button,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title
} from "@mantine/core"

import { Checkbox } from "@mantine/core"
import { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../../hooks/useLogin"

const SignInForm = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { login } = useLogin()

    const submitLogin = async () => {
        await login(username, password)
    }

    return (
        <>
            <Paper className="p-20 w-200 mr-10" shadow="lg" radius="lg">
                <img
                    className="mx-auto pr-4 mb-6 w-[70%] hover:brightness-75 cursor-pointer transition duration-400 ease-in-out"
                    src="/logo.svg"
                    alt="Logo"
                />
                <Text className="text-lg" ta="center">
                    Welcome back!
                </Text>
                <Title className="-m-1 text-3xl" ta="center">
                    Sign in now
                </Title>

                <TextInput
                    className="mt-14"
                    variant="filled"
                    label="User Name"
                    placeholder="Your username"
                    radius="md"
                    required
                    error=""
                    onChange={(e) => setUsername(e.target.value)}
                />

                <PasswordInput
                    variant="filled"
                    label="Password"
                    placeholder="Your password"
                    radius="md"
                    mt="md"
                    required
                    error=""
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Group justify="space-between" mt="lg">
                    <div className="flex">
                        <Checkbox className="mr-2" />
                        <p className="text-sm">
                            {" "}
                            I agree to the Privacy Policy{" "}
                        </p>
                    </div>
                    <Anchor component="button" size="sm">
                        Forgot password?
                    </Anchor>
                </Group>

                <div className="mt-20">
                    <Button
                        className="duration-301 ease-in-out rounded-2xl"
                        color="primary-blue"
                        fullWidth
                        onClick={submitLogin}
                    >
                        Button
                    </Button>
                </div>

                <Group mt="lg" className="justify-center">
                    <p className="text-sm">Not a member?</p>
                    <Link
                        to="/register"
                        className="text-sm font-bold -ml-2 text-primary-blue hover:underline decoration-2 cursor-pointer"
                    >
                        Register now
                    </Link>
                </Group>
            </Paper>
        </>
    )
}

export default SignInForm

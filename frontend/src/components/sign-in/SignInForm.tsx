import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Group,
    Button
} from "@mantine/core"

import { Checkbox } from "@mantine/core"
import { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../../hooks/useLogin"

const SignInForm = () => {
    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()
    const { login } = useLogin()

    const submit = () => {
        login(username, password)
    }

    return (
        <>
            <Paper className="h-full p-20 px-40" shadow="lg" radius="lg">
                <img
                    className="mx-auto pr-4 mb-12 w-2/3 hover:brightness-75 cursor-pointer transition duration-400 ease-in-out"
                    src="/logo.svg"
                    alt="Logo"
                />
                <Text className="text-lg" ta="center">
                    Welcome back!
                </Text>
                <Title className="-m-1 text-3xl" ta="center">
                    Sign in now
                </Title>

        <Paper className='p-20 w-[100%] mr-10' shadow="lg" radius="lg">
            <img className='mx-auto pr-4 mb-6 w-2/2 hover:brightness-75 cursor-pointer transition duration-400 ease-in-out' src="/logo.svg" alt="Logo" />
            <Text className='text-lg' ta="center">
                Welcome back!
            </Text>
            <Title className='-m-1 text-3xl' ta="center">
                Sign in now
            </Title> 

            <TextInput 
                className='mt-14' 
                variant='filled' 
                label="User Name" 
                placeholder="Your username" 
                radius="md" 
                required 
                error=''
                // TODO: Put error message here
            />

            <PasswordInput 
                variant='filled' 
                label="Password" 
                placeholder="Your password" 
                radius="md" 
                mt="md" 
                required
                error=''
                // TODO: Put error message here
            />
            
            <Group justify="space-between" mt="lg">
                {/* BUG: checkbox label nasa right even if set with prop sa left AAAAAAAAA BOBO MO MANTINE */}
                {/* For now... this is the fix */}
                <div className='flex'>
                    <Checkbox className='mr-2'/> 
                    <p className='text-sm'> I agree to the Privacy Policy </p>
                </div>
                <Anchor component="button" size="sm">
                    Forgot password?
                </Anchor>
            </Group>

            {/* BUG: variant: filled would not work at all AAAAAAAAAAAAAAAAAAAAAAAAAAAA */}
            <div className='mt-20'>
                <Button className='duration-300 ease-in-out rounded-2xl' color="primary-blue" fullWidth>Button</Button>
            </div>

            <Group  mt="lg" className='justify-center'>
                <p className='text-sm'>Not a member?</p>
                <Link to='/register' className='text-sm font-bold -ml-2 text-primary-blue hover:underline decoration-2 cursor-pointer'>Register now</Link>
            </Group>
            
        </Paper>
        </>
    )
}

export default SignInForm

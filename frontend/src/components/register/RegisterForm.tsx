import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    UnstyledButton,
    Group,
    Button,
} from '@mantine/core';

import { Link } from 'react-router-dom';

const RegisterForm = () => {
    return (
        <>
        <Paper className='ml-10 p-20 w-full' shadow="lg" radius="lg">
            <img className='mx-auto pr-4 mb-6 w-2/2 hover:brightness-75 cursor-pointer transition duration-400 ease-in-out' src="/logo.svg" alt="Logo" />
            <Title className='-m-1 text-3xl' ta="center">
                Register your account
            </Title>
            
            <TextInput 
                className='mt-11' 
                variant='filled' 
                label="User Name" 
                placeholder="Your username" 
                radius="md" 
                required 
                error=''
                // TODO: Put error message here
            />

            <TextInput 
                variant='filled' 
                label="Email" 
                placeholder="Your email" 
                radius="md" 
                mt="md" 
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
            <Group justify="end" mt="lg">
                <Checkbox label="I agree to the Privacy Policy"/>
            </Group>

            {/* BUG: variant: filled would not work at all AAAAAAAAAAAAAAAAAAAAAAAAAAAA */}
            <div className='mt-14'>
                <Button variant="outline" color="primary-blue" fullWidth>Button</Button>
            </div>

            <Group  mt="lg" className='justify-center'>
                <p className='text-sm'> Have an account?</p>
                <Link to='/sign-in' className='text-sm font-bold -ml-3 text-primary-blue hover:underline decoration-2 cursor-pointer'>Sign in</Link>
            </Group>
        </Paper>
        </>
    )
}

export default RegisterForm;
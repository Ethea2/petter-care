import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Group,
    Button,
} from '@mantine/core';

import { Checkbox } from '@mantine/core'
import { Link } from 'react-router-dom';

const SignInForm = () => {
    return (
        <>

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
                <Checkbox label="Remember me" />
                <Anchor component="button" size="sm">
                    Forgot password?
                </Anchor>
            </Group>

            {/* BUG: variant: filled would not work at all AAAAAAAAAAAAAAAAAAAAAAAAAAAA */}
            <div className='mt-20'>
                <Button variant="outline" color="primary-blue" fullWidth>Button</Button>
            </div>

            <Group  mt="lg" className='justify-center'>
                <p className='text-sm'> Not a member?</p>
                <Link to='/register' className='text-sm font-bold -ml-2 text-primary-blue hover:underline decoration-2 cursor-pointer'>Register now</Link>
            </Group>
            
        </Paper>
        </>
    )
}

export default SignInForm;
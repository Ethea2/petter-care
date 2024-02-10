import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';

import { useElementSize } from '@mantine/hooks';
import { rem } from '@mantine/core';

const Login = () => {
    const { ref, width, height } = useElementSize();
    return (
        <>  
            <div className='absolute flex justify-center items-center w-screen h-screen bg-gradient-to-r from-primary-blue to-accent3-purple'>

                <div className='border flex w-5/6 h-5/6'>

                    {/* Left */}
                    <div className='w-1/2 border'>

                    </div>

                    {/* Right */}
                    <div className='w-1/2 h-full border'>
                        <Paper shadow="md" radius="md">
                        <Title ta="center">
                            Welcome back!
                        </Title>
                        <Text c="dimmed" size="sm" ta="center" mt={5}>
                            Do not have an account yet?{' '}
                            <Anchor size="sm" component="button">
                            Create account
                            </Anchor>
                        </Text>
                        <TextInput label="Email" placeholder="you@mantine.dev" required />
                        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
                        <Group justify="space-between" mt="lg">
                            <Checkbox label="Remember me" />
                            <Anchor component="button" size="sm">
                                Forgot password?
                            </Anchor>
                        </Group>
                        <Button variant="filled" color='violet' fullWidth mt="xl">
                            Sign in
                        </Button>
                    </Paper>
                    </div>
                </div>
                    
            </div>
            
        </>
    )
}

export default Login

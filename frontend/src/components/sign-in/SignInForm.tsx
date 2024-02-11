import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
Text,
  Group,
  Button,
} from '@mantine/core';

const SignInForm = () => {
    return (
        <>
        <Paper className='h-full p-20 px-40 border' shadow="md" radius="lg">
            <Text  ta="center">
                Welcome back!
            </Text>
            <Title className='-m-2' ta="center">
                Sign in now
            </Title>

            <TextInput className='mt-20' variant='filled' label="User Name" placeholder="Your username" radius="md" required />
            <PasswordInput variant='filled' label="Password" placeholder="Your password" radius="md" mt="md" required/>
            <Group justify="space-between" mt="lg">
                <Checkbox label="Remember me"/>
                <Anchor component="button" size="sm">
                    Forgot password?
                </Anchor>
            </Group>
            <Button color='blue'>Button</Button>
        </Paper>
        </>
    )
}

export default SignInForm;
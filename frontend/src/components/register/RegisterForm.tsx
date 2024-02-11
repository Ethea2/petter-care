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

const RegisterForm = () => {
    return (
        <>
        <Paper className='h-full p-20 px-40' shadow="md" radius="lg">
            <img className='mx-auto pr-4 mb-12 w-2/3 hover:brightness-75 cursor-pointer transition duration-400 ease-in-out' src="/logo.svg" alt="Logo" />
            <Title className='-m-1 text-3xl' ta="center">
                Register your account
            </Title>

            <TextInput className='mt-20' variant='filled' label="User Name" placeholder="Your username" radius="md" required />
            <PasswordInput variant='filled' label="Password" placeholder="Your password" radius="md" mt="md" required/>
            <PasswordInput variant='filled' label="Confirm Password" placeholder="Your password" radius="md" mt="md" required/>
            {/* <Group justify="space-between" mt="lg">
                <Checkbox label="I agree to the Privacy Policy"/>
            </Group> */}
            <Button color='blue'>Button</Button>
        </Paper>
        </>
    )
}

export default RegisterForm;
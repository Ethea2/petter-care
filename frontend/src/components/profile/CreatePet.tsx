import {
    TextInput,
    Paper,
    Title,
    NativeSelect,
    NumberInput,
    FileButton,
    ActionIcon,
    Group,
    Button
} from "@mantine/core"

import { Link } from "react-router-dom"

const CreatePet = () => {

    const setFile = () => {
        return null
    }

    return (
        <>
            <Paper className="p-20 w-[60%] h-auto" shadow="lg" radius="lg">

                <Group justify="center">
                    <FileButton
                        accept="image/png,image/jpeg"
                        onChange={setFile}
                    >
                        {(props) => (
                            <ActionIcon
                                {...props}
                                style={{ width: '30%', height: '30%', borderRadius: '50%' }}
                            >
                                <img
                                    src="/default-pet.svg"
                                />
                            </ActionIcon>
                        )}
                    </FileButton>
                </Group>

                <Title className="text-2xl mt-5" ta="center">
                    Enter your pet details
                </Title>

                <TextInput
                    className="mt-5"
                    label="Pet Name"
                    placeholder="Pet's Name"
                    radius="md"
                    required
                />

                <TextInput
                    label="Birthday"
                    placeholder="Pet's Birthday"
                    radius="md"
                    mt="md"
                    error=""
                />

                <NumberInput
                    label="Age"
                    placeholder="Pet's Age"
                    min={1}
                    max={50}
                    mt="md"
                />

                <TextInput
                    label="Breed"
                    placeholder="Pet's Breed"
                    radius="md"
                    mt="md"
                    error=""
                />

                <NativeSelect
                    label="Sex"
                    data={['Male', 'Female']}
                    mt="md"
                />

                <div className="flex justify-center">
                    <Link
                        to="/pet-access"
                    >
                        <Button
                            className="rounded-2xl duration-300 ease-in-out mr-4"
                            variant="outline"
                            mt="xl"
                        >
                            Cancel
                        </Button>
                    </Link>
                    <Link
                        to="/pet-profile"
                    >
                        <Button
                            className="rounded-2xl duration-300 ease-in-out"
                            color="primary-blue"
                            mt="xl"
                        >
                            Submit
                        </Button>
                    </Link>
                </div>

            </Paper>
        </>
    )
}

export default CreatePet
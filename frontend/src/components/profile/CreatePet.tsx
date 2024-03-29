import {
    TextInput,
    Paper,
    Title,
    NativeSelect,
    NumberInput,
    Button
} from "@mantine/core"

const CreatePet = () => {
    return (
        <>
            <Paper className="p-20 w-[60%] h-auto" shadow="lg" radius="lg">
                <img
                    className="mx-auto mb-6 w-40 h-40 rounded-full"
                    src="/default-pet.svg"
                    alt="Logo"
                />

                <Title className="text-2xl" ta="center">
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
                    <Button
                        className="rounded-2xl duration-300 ease-in-out mr-4"
                        variant="outline"
                        mt="xl"
                    >
                        Cancel
                    </Button>
                    <Button
                        className="rounded-2xl duration-300 ease-in-out"
                        color="primary-blue"
                        mt="xl"
                    >
                        Submit
                    </Button>
                </div>

            </Paper>
        </>
    )
}

export default CreatePet
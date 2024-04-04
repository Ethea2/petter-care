import {
    ActionIcon,
    Button,
    FileButton,
    Group,
    NativeSelect,
    NumberInput,
    Paper,
    TextInput,
    Title
} from "@mantine/core"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import axios from "axios"
import { Link } from "react-router-dom"

const CreatePet = () => {
    const [image, setImage] = useState<File | null>()
    const [imageName, setImageName] = useState<string>("")
    const [name, setName] = useState("")
    const [bday, setBday] = useState("")
    const [age, setAge] = useState<number | string>()
    const [sex, setSex] = useState("Male")
    const [breed, setBreed] = useState("")
    const user = JSON.parse(localStorage.getItem("user") as string)

    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image)
            setImageName(objectUrl)
        } else {
            setImageName("")
        }
    }, [image])
    const isAnyEmpty = (): boolean => {
        return !name || !bday || !age || !sex || !breed
    }

    const isValidDateFormat = (dateString: string) => {
        // Regular expression pattern for mm/dd/yyyy format
        console.log(dateString)
        const dateFormatPattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/

        // Test the input string against the pattern
        return dateFormatPattern.test(dateString)
    }

    const upload = async () => {
        if (!image) {
            const res = await fetch(
                import.meta.env.VITE_DEFAULT_URL + "/api/pet/",
                {
                    method: "POST",
                    body: JSON.stringify({
                        breed,
                        sex,
                        age,
                        name,
                        bday
                    }),

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.token}`
                    }
                }
            )
            if (!res.ok) {
                toast("Something went wrong", {
                    type: "error",
                    autoClose: 3000
                })
                return
            }
            toast("Pet added successfully!", {
                type: "success",
                autoClose: 3000
            })
            return
        }

        const res = await axios.post(
            `${import.meta.env.VITE_DEFAULT_URL}/api/pet/upload`,
            {
                img: image,
                breed,
                sex,
                age,
                name,
                bday
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${user?.token}`
                }
            }
        )
        if (res.status !== 200) {
            toast("Something went wrong", {
                type: "error",
                autoClose: 3000
            })
            return
        }
        console.log(res)
        toast("Pet added successfully!", {
            type: "success",
            autoClose: 3000
        })
        return
    }

    const submit = async () => {
        if (isAnyEmpty()) {
            toast("Please fill all the required fields", {
                type: "warning",
                autoClose: 3000
            })
            return
        }
        if (!isValidDateFormat(bday)) {
            toast("Please use the right date format", {
                type: "warning",
                autoClose: 3000
            })
            return
        }
        await upload()
    }

    return (
        <>
            <Paper className="p-20 w-[60%] h-auto" shadow="lg" radius="lg">
                <Group justify="center">
                    <FileButton
                        accept="image/png,image/jpeg"
                        onChange={setImage}
                    >
                        {(props) => (
                            <ActionIcon
                                {...props}
                                style={{
                                    width: "30%",
                                    height: "30%",
                                    borderRadius: "50%"
                                }}
                            >
                                <img
                                    src={image ? imageName : "/default-pet.svg"}
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
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                />

                <TextInput
                    label="Birthday"
                    placeholder="e.g. 15/2/2022"
                    radius="md"
                    mt="md"
                    onChange={(e) => setBday(e.target.value)}
                    value={bday}
                    error=""
                />

                <NumberInput
                    label="Age"
                    placeholder="Pet's Age"
                    min={1}
                    max={50}
                    value={age}
                    onChange={setAge}
                    mt="md"
                />

                <TextInput
                    label="Breed"
                    placeholder="Pet's Breed"
                    radius="md"
                    mt="md"
                    onChange={(e) => setBreed(e.target.value)}
                    value={breed}
                    error=""
                />

                <NativeSelect
                    label="Sex"
                    data={["Male", "Female"]}
                    mt="md"
                    onChange={(e) => setSex(e.target.value)}
                    value={sex}
                />

                <div className="flex justify-center">
                    <Link to="/pet-access">
                        <Button
                            className="rounded-2xl duration-300 ease-in-out mr-4"
                            variant="outline"
                            mt="xl"
                        >
                            Cancel
                        </Button>
                    </Link>
                    <Button
                        className="rounded-2xl duration-300 ease-in-out"
                        color="primary-blue"
                        mt="xl"
                        onClick={submit}
                    >
                        Submit
                    </Button>
                </div>
            </Paper>
        </>
    )
}

export default CreatePet

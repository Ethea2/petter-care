import { useDisclosure } from '@mantine/hooks';
import { PiNotePencilBold } from "react-icons/pi";
import { Button, Modal, TextInput, Textarea } from "@mantine/core"

const PetCard = () => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>  
            <Modal opened={opened} onClose={close} title="Edit profile" centered>
                <TextInput
                    className='mb-3'
                    label="User Name"
                    placeholder="Your username"
                />

                <Textarea
                    className='mb-3'
                    label="Bio"
                    placeholder="Your bio"
                />


                <div className="mt-4 flex justify-end">
                    <Button
                        className="rounded-2xl duration-300 ease-in-out"
                        color="primary-blue"
                    >
                        Save
                    </Button>
                </div>
            </Modal>

            <div className="w-[100%] h-auto bg-dirty-white rounded-2xl mb-6 shadow-md justify-center">
                <div className="flex justify-center items-center pt-10 pb-5">
                    <div className="flex justify-center items-center h-24 w-24 rounded-full drop-shadow">
                        <img src="/default-pet.svg" className="rounded-full h-full w-full object-cover" />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center text-center pb-4">
                    <p className="text-xl font-bold">Leny</p>
                    <p className="text-grey pb-4">September 8, 2022</p>
                    <p className="pb-2"><strong>Age: </strong>2 y/o</p>
                    <p className="pb-2"><strong>Breed: </strong>Beagle</p>
                    <p className="pb-2"><strong>Sex: </strong>Female</p>
                </div>

                {/* TODO: Add hover effect */}
                <div 
                    className="border-t border-input-grey text-base  hover:brightness-75 cursor-pointer transition duration-400 ease-in-out"
                    onClick={open}
                    >
                    <div className="w-full p-4 border-input-grey rounded-bl-2xl">
                        <div className="flex flex-col justify-center items-center">
                            <a className="text-3xl text-black pb-2" href="/">
                                <PiNotePencilBold />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PetCard;
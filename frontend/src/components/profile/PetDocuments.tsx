import {
    Button,
    Modal,
    Fieldset,
    TextInput,
    ColorInput
} from "@mantine/core"

import { useDisclosure } from '@mantine/hooks';

import RecordCard from './pet-records/RecordCard.tsx';
import RecordTable from './pet-records/RecordTable.tsx';


const PetRecords = () => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <div className="mb-3 flex justify-end">
                <Modal opened={opened} onClose={close} title="Create a new record">
                    <Fieldset>
                        <TextInput 
                            className="mb-3"
                            label="Title" 
                            placeholder="Enter record title" required />
                        
                        <TextInput 
                            className="mb-3"
                            label="Description" 
                            placeholder="Enter record title" />
                        
                        <TextInput 
                            className="mb-3"
                            label="Badge name" 
                            placeholder="Enter record title" required />

                        <ColorInput
                            label="Badge Color"
                            placeholder="Input placeholder"
                        />
                    </Fieldset>
                </Modal>

                <Button onClick={open}>Create a new record</Button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>


                <RecordCard 
                    title={"Leny's Vaccinations"}
                    description={'A list of vaccinations taken by Leny'}
                    badge={'Records'}
                    badgeColor='pink'
                    link="/records/vaccinations"
                />

                <RecordCard 
                    title={"Leny's Medications"}
                    description={'A list of medications taken by Leny'}
                    badge={'Records'}
                    badgeColor='pink'
                    link="/records/medications"
                />

                <RecordCard 
                    title={"Leny's Information"}
                    badge={'Profile'}
                    badgeColor='blue'
                    link="/records/information"
                />

                <RecordCard 
                    title={"Leny's Vet Visits"}
                    description={"A list of Leny's Vet Visits"}
                    badge={'Records'}
                    badgeColor='pink'
                    link="/records/vaccinations"
                />

                
                

            </div>
            <RecordTable/>
        </>
    )
}

export default PetRecords

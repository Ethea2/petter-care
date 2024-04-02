import {
    Paper,
    Tabs
} from "@mantine/core"

import PetInfo from './pet-records/PetInfo'
import PetMeds from './pet-records/PetMeds'
import PetVet from './pet-records/PetVet'

const PetRecords = () => {

    return (
        <>  
            <Paper className="p-9 w-full h-auto" shadow="lg" radius="lg">
                <Tabs defaultValue='info'>
                    <Tabs.List className="mb-3">
                        <Tabs.Tab value='info'>Information</Tabs.Tab>
                        <Tabs.Tab value='meds'>Medications</Tabs.Tab>
                        <Tabs.Tab value='vet'>Vet Visits</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="info">
                        <PetInfo />
                    </Tabs.Panel>

                    <Tabs.Panel value="meds">
                       <PetMeds />
                    </Tabs.Panel>

                    <Tabs.Panel value="vet">
                        <PetVet />
                    </Tabs.Panel>
                </Tabs>


                
            </Paper>
        </>
    )
}

export default PetRecords;
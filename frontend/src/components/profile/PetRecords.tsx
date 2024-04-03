import { Paper, Tabs } from "@mantine/core"

import PetInfo from "./pet-records/PetInfo"
import PetMeds from "./pet-records/PetMeds"
import PetVet from "./pet-records/PetVet"
import { IPets } from "../../types/petTypes"

const PetRecords = ({ pet }: { pet: IPets }) => {
    return (
        <>
            <Paper className="p-9 w-full h-auto" shadow="lg" radius="lg">
                <Tabs defaultValue="info">
                    <Tabs.List className="mb-3">
                        <Tabs.Tab value="info">Information</Tabs.Tab>
                        <Tabs.Tab value="meds">Medications</Tabs.Tab>
                        <Tabs.Tab value="vet">Vet Visits</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="info">
                        <PetInfo pet={pet} />
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

export default PetRecords

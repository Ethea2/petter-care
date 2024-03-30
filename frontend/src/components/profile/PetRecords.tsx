

import {
    Paper,
    Tabs
} from "@mantine/core"

import PetCalendar from './PetCalendar.tsx'
import PetNotes from './PetNotes.tsx'
import PetDocuments from './PetDocuments.tsx'

const PetRecords = () => {

    return (
        <>  
            <Paper className="p-9 w-full h-auto" shadow="lg" radius="lg">
                <Tabs defaultValue='appointments'>
                    <Tabs.List className="mb-3">
                        <Tabs.Tab value='appointments'>Appointments</Tabs.Tab>
                        <Tabs.Tab value='docu'>Records & Documents</Tabs.Tab>
                        <Tabs.Tab value='notes'>Notes</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="appointments">
                        <div className="">
                            <PetCalendar />
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="docu">
                        <PetDocuments />
                    </Tabs.Panel>

                    <Tabs.Panel value="notes">
                        <PetNotes />
                    </Tabs.Panel>
                </Tabs>


                
            </Paper>
        </>
    )
}

export default PetRecords;
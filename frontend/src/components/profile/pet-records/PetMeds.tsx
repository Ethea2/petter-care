import { 
    Table,
    Modal, 
    Fieldset,
    TextInput,
    Button,
    } from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

// interface RowData {
//   date: string;
//   location: string;
//   attending_doctor: string;
//   reason: string;
// }

// interface ThProps {
//   children: React.ReactNode;
//   reversed: boolean;
//   sorted: boolean;
//   onSort(): void;
// }

const elements = [
    { date: 6, location: 12.011, attending_doctor: 'C', reason: 'Carbon'},
    { date: 6, location: 12.011, attending_doctor: 'C', reason: 'Carbon'},
    { date: 6, location: 12.011, attending_doctor: 'C', reason: 'Carbon'},
    { date: 6, location: 12.011, attending_doctor: 'C', reason: 'Carbon'},
];


const PetMeds = () => {
    const [opened, { open, close }] = useDisclosure(false);

    const rows = elements.map((element) => (
    <Table.Tr key={element.date}>
        <Table.Td>{element.date}</Table.Td>
        <Table.Td>{element.location}</Table.Td>
        <Table.Td>{element.attending_doctor}</Table.Td>
        <Table.Td>{element.reason}</Table.Td>
        </Table.Tr>
    ));

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

                    </Fieldset>
                </Modal>

                <Button onClick={open}>Add a record</Button>
            </div>
            <Table withTableBorder highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                    <Table.Th>Date</Table.Th>
                    <Table.Th>Location</Table.Th>
                    <Table.Th>Attending Doctor</Table.Th>
                    <Table.Th>Reason</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
    )
}

export default PetMeds;
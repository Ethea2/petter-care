import { useState } from 'react';
import {
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    Center,
    TextInput,
    rem,
    keys,
    Button, 
    Modal,
    Fieldset,
    Textarea
} from '@mantine/core';


import { useDisclosure } from '@mantine/hooks';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';

interface RowData {
    variable: string;
    information: string;  
}

interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
        <Table.Th >
        <UnstyledButton onClick={onSort} >
            <Group justify="space-between">
            <Text fw={500} fz="sm">
                {children}
            </Text>
            <Center>
                <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </Center>
            </Group>
        </UnstyledButton>
        </Table.Th>
    );
}

function filterData(data: RowData[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        keys(data[0]).some((key) => {
            const value = item[key];
            if (typeof value === 'string') {
                return value.toLowerCase().includes(query);
            }
            return false;
        })
    );
}

function sortData(
    data: RowData[],
    payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
    ) {
    const { sortBy } = payload;

    if (!sortBy) {
        return filterData(data, payload.search);
    }

    return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                return String(b[sortBy]).localeCompare(String(a[sortBy]));
            }

            return String(a[sortBy]).localeCompare(String(b[sortBy]));
        }),
        payload.search
    );
}

const data = [
    { variable: "Name", information: 'Leny'},
    { variable: "Birthday", information: 'September 8, 2022'},
    { variable: "Age", information: '2 y/o'},
    { variable: "Breed", information: 'Beagle'},
    { variable: "Sex", information: 'Female'},
    { variable: "Wants", information: 'Chimken, Me'},
    { variable: "Hates", information: 'Me'},
    ];

const PetInfo = () => {
const [opened, { open, close }] = useDisclosure(false);

    // const [value, setValue] = useState<Date | null>(null);

    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const setSorting = (field: keyof RowData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(data, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const rows = sortedData.map((row) => (
        <Table.Tr>
            <Table.Td>{row.variable}</Table.Td>
            <Table.Td>{row.information}</Table.Td>
        </Table.Tr>
    ));
    
    return (
        <>  
        <ScrollArea>
        {/* Top bar */}
        
        <div className='flex justify-between space-x-4'>
            <div className='w-10/12'>
                <TextInput
                    placeholder="Search by any field"
                    mb="md"
                    leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>

            <div className='w-2/12'>
                <Modal 
                    opened={opened} 
                    onClose={close} 
                    title="Add a row"
                    size='lg'>
                    <Fieldset>
                        <TextInput 
                            className="mb-3"
                            label="Header" 
                            placeholder="Enter header" 
                            />
                        
                        <Textarea
                            className="mb-3"
                            label="Information" 
                            placeholder="Enter information"/>

                    </Fieldset>
                </Modal>

                <Button fullWidth className='justify-items-end' onClick={open}>Add a row</Button>
            </div>
        </div>

        <Table withTableBorder highlightOnHover horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
            <Table.Tbody>
            <Table.Tr>
                <Th
                    sorted={sortBy === 'variable'}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting('variable')}>
                    What 
                </Th>

                <Th
                    sorted={sortBy === 'information'}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting('information')}>
                    Information
                </Th>

            </Table.Tr>

            </Table.Tbody>

            <Table.Tbody>
            {rows.length > 0 ? (
                rows
            ) : (
                <Table.Tr>
                <Table.Td colSpan={Object.keys(data[0]).length}>
                    <Text fw={500} ta="center">
                    Nothing found
                    </Text>
                </Table.Td>
                </Table.Tr>
            )}
            </Table.Tbody>
        </Table>
        </ScrollArea>
        </>
    )
}

export default PetInfo;
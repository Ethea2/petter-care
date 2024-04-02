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

import { DateInput } from '@mantine/dates';

import { useDisclosure } from '@mantine/hooks';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';

interface RowData {
    date: Date;
    prescribing_doctor: string;
    medication: string;
    reason: string;
    note: string;
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
    { 
        date: new Date('2022-05-01'), 
        prescribing_doctor: 'Dr. Smith', 
        medication: 'Medication A', 
        reason: 'Treatment',
        note: "Take 1 pill every 12 hours for 7 days."
    },
    { 
        date: new Date('2022-06-15'), 
        prescribing_doctor: 'Dr. Johnson', 
        medication: 'Medication B', 
        reason: 'Checkup',
        note: "Take 1 pill every 24 hours for 14 days."
    },
    { 
        date: new Date('2022-07-10'), 
        prescribing_doctor: 'Dr. Anderson', 
        medication: 'Medication C', 
        reason: 'Treatment',
        note: "Take 1 pill every 24 hours for 7 days."
    },
    { 
        date: new Date('2022-08-20'), 
        prescribing_doctor: 'Dr. Williams', 
        medication: 'Medication D', 
        reason: 'Checkup',
        note: "Take 1 pill every 12 hours for 14 days."
    },
];

const PetMeds = () => {
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
            <Table.Td>{row.date.toLocaleDateString()}</Table.Td>
            <Table.Td>{row.prescribing_doctor}</Table.Td>
            <Table.Td>{row.medication}</Table.Td>
            <Table.Td>{row.reason}</Table.Td>
            <Table.Td>{row.note}</Table.Td>
        </Table.Tr>
    ));

  return (
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
                    title="Add a record"
                    size='lg'>
                    <Fieldset>
                        <DateInput
                            className="mb-3"
                            label="Enter date"
                            placeholder='Enter date'
                            required
                        />
                        
                        <TextInput 
                            className="mb-3"
                            label="Prescribing doctor" 
                            placeholder="Enter name of doctor who prescribed the medication" 
                            required
                            />
                        
                        <TextInput 
                            className="mb-3"
                            label="Medication" 
                            placeholder="Enter name of medication"
                            required
                            />
                        
                        <Textarea 
                            className="mb-3"
                            label="Reason" 
                            placeholder="Enter the reason of prescription"
                            resize='vertical'
                            required/>
                        
                        <Textarea 
                            className="mb-3"
                            label="Note" 
                            placeholder="Enter any notes (such as how long to take the medication, and how often)"
                            resize='vertical'
                            required/>

                    </Fieldset>
                </Modal>

                <Button fullWidth className='justify-items-end' onClick={open}>Add a record</Button>
            </div>
        </div>

        <Table withTableBorder highlightOnHover horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
            <Table.Tbody>
            <Table.Tr>
                <Th
                    sorted={sortBy === 'date'}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting('date')}>
                        Date
                </Th>

                <Th
                    sorted={sortBy === 'prescribing_doctor'}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting('prescribing_doctor')}>
                        Prescribing Doctor
                </Th>

                <Th
                    sorted={sortBy === 'medication'}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting('medication')}>
                        Medication
                </Th>

                <Th
                    sorted={sortBy === 'reason'}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting('reason')}>
                        Reason
                </Th>

                <Th
                    sorted={sortBy === 'note'}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting('note')}>
                        Note
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
  );
}

export default PetMeds;
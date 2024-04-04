import {
    Button,
    Center,
    Fieldset,
    Group,
    Modal,
    ScrollArea,
    Table,
    Text,
    TextInput,
    Textarea,
    UnstyledButton,
    keys,
    rem
} from "@mantine/core"
import { useState } from "react"

import { DateInput } from "@mantine/dates"

import { useDisclosure } from "@mantine/hooks"
import {
    IconChevronDown,
    IconChevronUp,
    IconSearch,
    IconSelector
} from "@tabler/icons-react"
import { toast } from "react-toastify"
import { IMedicalRecords } from "../../../types/petTypes"

interface RowData {
    date: Date
    prescribing_doctor: string
    medication: string
    reason: string
    note: string
}

interface ThProps {
    children: React.ReactNode
    reversed: boolean
    sorted: boolean
    onSort(): void
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
    const Icon = sorted
        ? reversed
            ? IconChevronUp
            : IconChevronDown
        : IconSelector
    return (
        <Table.Th>
            <UnstyledButton onClick={onSort}>
                <Group justify="space-between">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center>
                        <Icon
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                        />
                    </Center>
                </Group>
            </UnstyledButton>
        </Table.Th>
    )
}

function filterData(data: RowData[], search: string) {
    const query = search.toLowerCase().trim()
    return data.filter((item) =>
        keys(data[0]).some((key) => {
            const value = item[key]
            if (typeof value === "string") {
                return value.toLowerCase().includes(query)
            }
            return false
        })
    )
}

function sortData(
    data: RowData[],
    payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
    const { sortBy } = payload

    if (!sortBy) {
        return filterData(data, payload.search)
    }

    return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                return String(b[sortBy]).localeCompare(String(a[sortBy]))
            }

            return String(a[sortBy]).localeCompare(String(b[sortBy]))
        }),
        payload.search
    )
}

const PetMeds = ({
    petMeds,
    pet_id
}: {
    petMeds: IMedicalRecords[]
    pet_id: string | undefined
}) => {
    const [opened, { open, close }] = useDisclosure(false)
    const [date, setDate] = useState<Date | null>()
    const [doctor, setDoctor] = useState("")
    const [meds, setMeds] = useState("")
    const [reason, setReason] = useState("")
    const [note, setNote] = useState("")
    const user = JSON.parse(localStorage.getItem("user") as string)

    const data =
        petMeds.length >= 1
            ? petMeds.map((pet) => {
                  return {
                      date: new Date(pet.date),
                      prescribing_doctor: pet.doctor,
                      medication: pet.medication,
                      reason: pet.reason,
                      note: pet.note
                  }
              })
            : []

    const submitForm = async () => {
        if (!date || !meds || !reason || !note || !doctor) {
            toast("Everything should be filled up!", {
                type: "warning",
                autoClose: 3000
            })
            return
        }
        const res = await fetch(
            `${import.meta.env.VITE_DEFAULT_URL}/api/pet/medical/${pet_id}`,
            {
                method: "POST",
                body: JSON.stringify({
                    reason,
                    note,
                    medication: meds,
                    doctor,
                    date
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            }
        )
        if (!res.ok) {
            toast("Something went wrong!", {
                type: "error",
                autoClose: 3000
            })
        }

        toast("Successfully added!", {
            type: "success",
            autoClose: 3000
        })
        window.location.reload()
    }

    const [search, setSearch] = useState("")
    const [sortedData, setSortedData] = useState(data)
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null)
    const [reverseSortDirection, setReverseSortDirection] = useState(false)

    const setSorting = (field: keyof RowData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false
        setReverseSortDirection(reversed)
        setSortBy(field)
        setSortedData(sortData(data, { sortBy: field, reversed, search }))
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget
        setSearch(value)
        setSortedData(
            sortData(data, {
                sortBy,
                reversed: reverseSortDirection,
                search: value
            })
        )
    }

    const rows = sortedData.map((row, key) => (
        <Table.Tr key={key}>
            <Table.Td>{row.date.toLocaleDateString()}</Table.Td>
            <Table.Td>{row.prescribing_doctor}</Table.Td>
            <Table.Td>{row.medication}</Table.Td>
            <Table.Td>{row.reason}</Table.Td>
            <Table.Td>{row.note}</Table.Td>
        </Table.Tr>
    ))

    return (
        <ScrollArea>
            {/* Top bar */}

            <div className="flex justify-between space-x-4">
                <div className="w-10/12">
                    <TextInput
                        placeholder="Search by any field"
                        mb="md"
                        leftSection={
                            <IconSearch
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5}
                            />
                        }
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="w-2/12">
                    <Modal
                        opened={opened}
                        onClose={close}
                        title="Add a record"
                        size="lg"
                    >
                        <Fieldset>
                            <DateInput
                                className="mb-3"
                                label="Enter date"
                                placeholder="Enter date"
                                required
                                value={date}
                                onChange={setDate}
                            />

                            <TextInput
                                className="mb-3"
                                label="Prescribing doctor"
                                placeholder="Enter name of doctor who prescribed the medication"
                                required
                                value={doctor}
                                onChange={(e) => setDoctor(e.target.value)}
                            />

                            <TextInput
                                className="mb-3"
                                label="Medication"
                                placeholder="Enter name of medication"
                                required
                                value={meds}
                                onChange={(e) => setMeds(e.target.value)}
                            />

                            <Textarea
                                className="mb-3"
                                label="Reason"
                                placeholder="Enter the reason of prescription"
                                resize="vertical"
                                required
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />

                            <Textarea
                                className="mb-3"
                                label="Note"
                                placeholder="Enter any notes (such as how long to take the medication, and how often)"
                                resize="vertical"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                required
                            />
                            <Button
                                onClick={submitForm}
                                fullWidth
                                className="justify-items-end"
                            >
                                Submit{" "}
                            </Button>
                        </Fieldset>
                    </Modal>

                    <Button
                        fullWidth
                        className="justify-items-end"
                        onClick={open}
                    >
                        Add a record
                    </Button>
                </div>
            </div>

            <Table
                withTableBorder
                highlightOnHover
                horizontalSpacing="md"
                verticalSpacing="xs"
                miw={700}
                layout="fixed"
            >
                <Table.Tbody>
                    <Table.Tr>
                        <Th
                            sorted={sortBy === "date"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("date")}
                        >
                            Date
                        </Th>

                        <Th
                            sorted={sortBy === "prescribing_doctor"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("prescribing_doctor")}
                        >
                            Prescribing Doctor
                        </Th>

                        <Th
                            sorted={sortBy === "medication"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("medication")}
                        >
                            Medication
                        </Th>

                        <Th
                            sorted={sortBy === "reason"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("reason")}
                        >
                            Reason
                        </Th>

                        <Th
                            sorted={sortBy === "note"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("note")}
                        >
                            Note
                        </Th>
                    </Table.Tr>
                </Table.Tbody>

                <Table.Tbody>
                    {petMeds.length >= 1 &&
                        (rows.length > 0 ? (
                            rows
                        ) : (
                            <Table.Tr>
                                <Table.Td colSpan={Object.keys(data[0]).length}>
                                    <Text fw={500} ta="center">
                                        Nothing found
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    )
}

export default PetMeds

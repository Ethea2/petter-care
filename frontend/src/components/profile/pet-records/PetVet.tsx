import { useState } from "react"
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
} from "@mantine/core"

import { DateInput } from "@mantine/dates"

import { useDisclosure } from "@mantine/hooks"
import {
    IconSelector,
    IconChevronDown,
    IconChevronUp,
    IconSearch
} from "@tabler/icons-react"
import { IVetVisits } from "../../../types/petTypes"
import { toast } from "react-toastify"

interface RowData {
    date: Date
    location: string
    attending_doctor: string
    reason: string
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

// const data = [
//     {
//         date: new Date("2022-01-01"),
//         location: "Pet Mobile",
//         attending_doctor: "Dr. Julie",
//         reason: "Got Vaccinated"
//     },
//     {
//         date: new Date("2022-02-15"),
//         location: "Pet Express",
//         attending_doctor: "Dr. Nessie",
//         reason: "Checkup"
//     },
//     {
//         date: new Date("2022-03-10"),
//         location: "Pet Express",
//         attending_doctor: "Dr. Nessie",
//         reason: "Checkup"
//     },
//     {
//         date: new Date("2022-04-20"),
//         location: "Vetenary Clinic",
//         attending_doctor: "Dr. Julie",
//         reason: "Checkup"
//     }
// ]

const PetVet = ({
    petVet,
    pet_id
}: {
    petVet: Array<IVetVisits>
    pet_id: string | undefined
}) => {
    const [opened, { open, close }] = useDisclosure(false)
    console.log(petVet)
    const data =
        petVet.length >= 1
            ? petVet.map((pet) => {
                  return {
                      date: new Date(pet.date),
                      location: pet.location,
                      attending_doctor: pet.doctor,
                      reason: pet.reason
                  }
              })
            : []
    // const [value, setValue] = useState<Date | null>(null);

    const [search, setSearch] = useState("")
    const [sortedData, setSortedData] = useState(data)
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null)
    const [reverseSortDirection, setReverseSortDirection] = useState(false)
    const [date, setDate] = useState<Date | null>()
    const [reason, setReason] = useState("")
    const [doctor, setDoctor] = useState("")
    const [location, setLocation] = useState("")
    const user = JSON.parse(localStorage.getItem("user") as string)

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

    const handleSubmit = async () => {
        const res = await fetch(
            `${import.meta.env.VITE_DEFAULT_URL}/api/pet/visit/${pet_id}`,
            {
                method: "POST",
                body: JSON.stringify({
                    reason,
                    date,
                    location,
                    doctor,
                    pet_id
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

    const rows = sortedData.map((row, key) => (
        <Table.Tr key={key}>
            <Table.Td>{row.date.toLocaleDateString()}</Table.Td>
            <Table.Td>{row.location}</Table.Td>
            <Table.Td>{row.attending_doctor}</Table.Td>
            <Table.Td>{row.reason}</Table.Td>
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
                                label="Location"
                                placeholder="Enter location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />

                            <TextInput
                                className="mb-3"
                                label="Attending doctor"
                                placeholder="Enter attending doctor"
                                value={doctor}
                                onChange={(e) => setDoctor(e.target.value)}
                            />

                            <Textarea
                                className="mb-3"
                                label="Reason"
                                placeholder="Enter the reason of visit"
                                resize="vertical"
                                required
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />

                            <Button
                                onClick={handleSubmit}
                                fullWidth
                                className="justify-items-end"
                            >
                                Submit
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
                            sorted={sortBy === "location"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("location")}
                        >
                            Location
                        </Th>

                        <Th
                            sorted={sortBy === "attending_doctor"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("attending_doctor")}
                        >
                            Attending Doctor
                        </Th>

                        <Th
                            sorted={sortBy === "reason"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("reason")}
                        >
                            Reason
                        </Th>
                    </Table.Tr>
                </Table.Tbody>

                <Table.Tbody>
                    {petVet.length >= 1 &&
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

export default PetVet

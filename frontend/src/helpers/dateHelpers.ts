export function parseDate(dateString: string) {
    const dateComponents = dateString.split(" ")

    const month = dateComponents[0]

    const day = dateComponents[1].replace(",", "")

    const year = dateComponents[2]

    const parsedDate = new Date(`${month} ${day}, ${year}`)

    return parsedDate
}

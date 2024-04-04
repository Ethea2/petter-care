import { forwardRef } from "react"
import { IconChevronDown } from "@tabler/icons-react"
import { Avatar, Text, UnstyledButton } from "@mantine/core"

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    image?: string
    username?: string
    icon?: React.ReactNode
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
    ({ image, name, username, ...others }: UserButtonProps, ref) => (
        <UnstyledButton
            ref={ref}
            style={{
                color: "var(--mantine-color-text)"
            }}
            {...others}
        >
            <div className="flex">
                <div className=" mr-5">
                    <div className="flex">
                        <div>Hi,</div>

                        <div className="ml-1 font-semibold"> {name} </div>
                    </div>
                </div>

                <Avatar src={image} radius="xl" />

                <IconChevronDown className="mt-2" size="1.3rem" />
            </div>
        </UnstyledButton>
    )
)

export default UserButton

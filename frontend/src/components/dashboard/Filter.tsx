import { Tabs } from '@mantine/core';
import Post from './Post.tsx'


const Filter = () => {
    return (
        <>
            <Tabs color="black" variant="pills" radius="xl" defaultValue="foryou" activateTabWithKeyboard>
                <Tabs.List className="pr-6">
                    <Tabs.Tab value="foryou" className="font-semibold text-base duration-300 ease-in-out hover:underline">
                        For You
                    </Tabs.Tab>
                    <Tabs.Tab value="following" className="font-semibold text-base hover:underline">
                        Following
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="foryou">
                    <Post />
                    <Post />
                    <Post />
                </Tabs.Panel>

                <Tabs.Panel value="following">
                    <Post />
                    <Post />

                </Tabs.Panel>

            </Tabs>
        </>
    )
}

export default Filter;
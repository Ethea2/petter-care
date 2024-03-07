import { Tabs } from '@mantine/core';
import Post from '../dashboard/Post'

const Filter = () => {
    return (
        <>
            <Tabs color="black" variant="pills" radius="xl" defaultValue="foryou" activateTabWithKeyboard>
                <Tabs.List className="pr-6">
                    <Tabs.Tab value="foryou" className="font-semibold text-base text-white">
                        For You
                    </Tabs.Tab>
                    <Tabs.Tab value="following" className="font-semibold text-base text-white">
                        Following
                    </Tabs.Tab>
                    <Tabs.Tab value="saved" className="font-semibold text-base text-white">
                        Saved
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

                <Tabs.Panel value="saved">
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </Tabs.Panel>
            </Tabs>

        </>
    )
}

export default Filter;
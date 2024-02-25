import { Tabs, Paper } from '@mantine/core';
import Post from './Post.tsx'


const Filter = () => {
    return (
        <>
            <Paper className='pl-5 pt-5 pb-5' shadow="lg" radius="lg">
                <Tabs radius="md" defaultValue="foryou" variant="outline" activateTabWithKeyboard>
                    <Tabs.List className='pt-2 pl-2'>
                        <Tabs.Tab value="foryou" className='font-semibold'>
                            For you
                        </Tabs.Tab>

                        <Tabs.Tab value="following" className='font-semibold'>
                            Following
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="foryou">
                        <Post/>
                        <Post/>
                        <Post/>
                    </Tabs.Panel>

                    <Tabs.Panel value="following">
                        <Post/>
                        <Post/>
                        <Post/>
                        <Post/>
                        <Post/>
                    </Tabs.Panel>

                </Tabs>
            </Paper>

            {/* <div className="flex items-center mb-6">
                <div className="space-x-6">
                    <button className="w-28 text-dirty-white font-bold bg-black py-2 rounded-2xl">For You</button>
                    <button className="w-28 text-black hover:text-dirty-white hover:font-bold hover:bg-black py-2 rounded-2xl">Following</button>
                </div>
                <div className="ml-auto pr-6">
                    <button>
                        <div className="w-6 h-auto">
                            <img src="/filter.svg" alt="Filter" />
                        </div>
                    </button>
                </div>
            </div> */}
        </>
    )
}

export default Filter;
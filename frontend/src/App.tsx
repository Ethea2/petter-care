import { useEffect } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "./layouts/Layouts"

import { useState } from "react"
// import reactLogo from "./assets/react.svg"
// import viteLogo from "/vite.svg"
import "./App.css"

import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import "react-toastify/dist/ReactToastify.css"


const theme = createTheme({
    fontFamily: "Inter, sans-serif",
    black: "#1E1E1E",
    primaryColor: "primary-blue",
    autoContrast: true,

    colors: {
        "primary-blue": [
            "#eaf1ff",
            "#d6dffc",
            "#acbcf0",
            "#7f98e4",
            "#5978db",
            "#4164d6",
            "#335ad4",
            "#244bbc",
            "#1c43aa",
            "#0d3897"
        ],
        "secondary-yellow": [
            "#fff6e3",
            "#fcecd0",
            "#f6d8a4",
            "#f0c273",
            "#ecb04b",
            "#e9a530",
            "#e79f21",
            "#cd8a13",
            "#b77b09",
            "#9f6900"
        ],
        "accent1-neon-blue": [
            "#e1ffff",
            "#cefcfc",
            "#a3f6f6",
            "#73f0f0",
            "#4decec",
            "#36e9e9",
            "#20e8e8",
            "#00cece",
            "#00b8b8",
            "#009f9f"
        ],
        "accent2-indigo": [
            "#f1f4f8",
            "#e2e5eb",
            "#c0c8d7",
            "#9ca9c4",
            "#7e8fb3",
            "#6a7faa",
            "#6076a7",
            "#506592",
            "#465a83",
            "#384d75"
        ],
        "accent3-purple": [
            "#f5ebff",
            "#e4d4fe",
            "#c5a7f6",
            "#a576ee",
            "#894de8",
            "#7832e5",
            "#6f24e4",
            "#5e18cb",
            "#5414b6",
            "#470da1"
        ],
        "dirty-white": [
            "#f2f5f8",
            "#e5e8e9",
            "#c7cfd5",
            "#a4b5c0",
            "#889eaf",
            "#7691a4",
            "#6b8aa0",
            "#5a778c",
            "#4e6a7e",
            "#3d5c70"
        ],
        black: [
            "#f5f5f5",
            "#e7e7e7",
            "#cdcdcd",
            "#b2b2b2",
            "#9a9a9a",
            "#8b8b8b",
            "#848484",
            "#717171",
            "#656565",
            "#575757"
            ],
        'white-darken': [
            "#fbf3f5",
            "#e7e7e7",
            "#cdcdcd",
            "#b2b2b2",
            "#9a9a9a",
            "#8b8b8b",
            "#848484",
            "#717171",
            "#656565",
            "#5c5557"

        ]
    }
})

function App() {
    useEffect(() => {
        const interval = setInterval(() => {}, 10000)
        return () => clearInterval(interval)
    }, [])


/* if anything messes up please look at the code below
function App() {
//     const [count, setCount] = useState(0)


    return (
        <Router>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <MantineProvider theme={theme}>
                <Layout />
            </MantineProvider>
        </Router>
    )
}
*/
export default App
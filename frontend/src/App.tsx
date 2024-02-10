import { useEffect } from "react"
import Layout from "./layouts/Layouts"
import { BrowserRouter as Router } from "react-router-dom";

import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';


const theme = createTheme({
  fontFamily: 'Inter, sans-serif'
});

function App() {

    useEffect(() => {
        const interval = setInterval(() => {
        }, 10000)
        return () => clearInterval(interval)
    }, [])

    return (
        
            <Router>
                <MantineProvider theme={theme}>
                    <Layout />
                </MantineProvider>
            </Router>
        
    )
}

export default App


import { useEffect } from "react"
import Layout from "./layouts/Layouts"
import { BrowserRouter as Router } from "react-router-dom";

function App() {

    useEffect(() => {
        const interval = setInterval(() => {
        }, 10000)
        return () => clearInterval(interval)
    }, [])
    return (
        <Router>
            <Layout />
        </Router>
    )
}

export default App


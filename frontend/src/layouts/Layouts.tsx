import { useState, useEffect } from "react"
import { useLocation } from "react-router"
import HomeLayout from "./home/HomeLayout"
import MainLayout from "./main/MainLayout"

const Layout = () => {
    const location = useLocation()
    const [noNavbar, setnoNavbar] = useState<Boolean>(false)
    useEffect(() => {
        console.log("Current Path:", location.pathname);
        if (location.pathname.includes("register") || location.pathname.includes("sign-in")) {
            setnoNavbar(true)
        } else {
            setnoNavbar(false)
        }
    }, [location])

    return (
        <>
            {noNavbar ? <HomeLayout /> : <MainLayout />}
        </>
    )
}

export default Layout

import { useRef } from "react"
import { useNavigate } from "react-router"
import { Id, toast } from "react-toastify"
import { useAuth } from "./useAuth"

const useRegister = () => {
    const toastID = useRef<Id>()
    const router = useNavigate()
    const { dispatch } = useAuth()

    const register = async (
        username: string | undefined,
        password: string | undefined
    ) => {
        toastID.current = toast.loading("Creating your account now...")

        const res = await fetch(
            `${import.meta.env.VITE_DEFAULT_URL}/api/auth/signup`,
            {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        const json = await res.json()
        if (!res.ok) {
            return toast.update(toastID.current, {
                render: json.message,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                type: "error",
                isLoading: false
            })
        }

        router("/sign-in")
        return toast.update(toastID.current, {
            render: "Login success!",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            type: "success",
            isLoading: false
        })
    }
    return { register }
}

export default useRegister

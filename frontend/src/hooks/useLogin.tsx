import { useRef } from "react"
import { useNavigate } from "react-router"
import { Id, toast } from "react-toastify"
import { useAuth } from "./useAuth"

const useLogin = () => {
    const { dispatch } = useAuth()
    const toastID = useRef<Id>()
    const router = useNavigate()

    const login = async (
        username: string | undefined,
        password: string | undefined
    ) => {
        toastID.current = toast.loading("Logging you in...")

        if (!username || !password) {
            return toast.update(toastID.current, {
                render: "Please input your credentials!",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                type: "error",
                isLoading: false
            })
        }

        const res = await fetch(
            `${import.meta.env.VITE_DEFAULT_URL}/api/auth/login`,
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
        localStorage.setItem("user", JSON.stringify(json))
        dispatch?.({ type: "LOGIN", payload: json })
        router("/")
        return toast.update(toastID.current, {
            render: "Login success!",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            type: "success",
            isLoading: false
        })
    }
    return { login }
}

export default useLogin

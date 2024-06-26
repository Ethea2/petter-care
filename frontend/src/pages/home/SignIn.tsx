import SignInForm from "../../components/sign-in/SignInForm.tsx"
import SignInAnimation from "../../components/sign-in/SignInAnimation.tsx"
import { useNavigate } from "react-router"
import { useEffect } from "react"

const Login = () => {
    const router = useNavigate()
    const user = JSON.parse(localStorage.getItem("user") as string)
    useEffect(() => {
        if (user) {
            router("/")
        }
    }, [])
    return (
        <>
            <div className="fixed flex justify-center items-center w-screen h-screen bg-gradient-to-r from-primary-blue to-accent3-purple">
                <div className="flex w-5/6 h-5/7 justify-end">
                    {/* Left */}
                    <SignInAnimation></SignInAnimation>

                    {/* Right */}
                    <div className="flex justify-center items-center">
                        <SignInForm></SignInForm>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login

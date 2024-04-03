import SignInForm from '../../components/sign-in/SignInForm.tsx';
import SignInAnimation from '../../components/sign-in/SignInAnimation.tsx';


const Login = () => {
    return (
        <>
            <div className='fixed flex justify-center items-center w-screen h-screen bg-gradient-to-r from-primary-blue to-accent3-purple'>
                <div className='flex w-[50%] items-center'>
                    <SignInAnimation></SignInAnimation>
                </div>
                <div className='flex w-[40%] items-center justify-center'>
                    <SignInForm></SignInForm>
                </div>
            </div>

        </>
    )
}

export default Login

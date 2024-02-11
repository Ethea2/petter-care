import SignInForm from '../../components/sign-in/SignInForm.tsx';
import SignInAnimation from '../../components/sign-in/SignInAnimation.tsx';


const Login = () => {
    return (
        <>  
            <div className='fixed flex justify-center items-center w-screen h-screen bg-gradient-to-r from-primary-blue to-accent3-purple'>
                

                <div className='flex w-5/6 h-5/6'>

                    {/* Left */}
                    <div className='w-1/2'>
                        <SignInAnimation></SignInAnimation>
                    </div>

                    {/* Right */}
                    <div className='w-1/2 h-full'>
                        <SignInForm></SignInForm>
                    </div>
                </div>
                    
            </div>
            
        </>
    )
}

export default Login

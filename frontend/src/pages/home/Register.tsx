import RegisterForm from '../../components/register/RegisterForm.tsx';
import RegisterAnimation from '../../components/register/RegisterAnimation.tsx';

const Register = () => {
    return (
        <>  
            <div className='fixed flex justify-center items-center w-screen h-screen bg-gradient-to-r from-primary-blue to-accent3-purple'>
                <div className='flex w-5/6 h-5/6'>

                    {/* Left */}
                    <div className='w-1/2'>
                        <RegisterForm></RegisterForm>
                    </div>

                    {/* Right */}
                    <div className='w-1/2 h-full'>
                        <RegisterAnimation></RegisterAnimation>
                    </div>
                </div>
                    
            </div>
            
        </>
    )
}

export default Register;

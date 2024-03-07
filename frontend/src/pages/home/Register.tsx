import RegisterForm from '../../components/register/RegisterForm.tsx';
import RegisterAnimation from '../../components/register/RegisterAnimation.tsx';

const Register = () => {
    return (
        <>  
            <div className='fixed flex justify-center items-center w-screen h-screen bg-gradient-to-r from-primary-blue to-accent3-purple'>
                <div className='flex w-5/6 h-5/7'>

                    {/* Left */}
                    <div className='flex w-[43%] justify-center items-center'>
                        <RegisterForm></RegisterForm>
                    </div>

                    {/* Right */}
                        <RegisterAnimation></RegisterAnimation>
                </div>
                    
            </div>
            
        </>
    )
}

export default Register;

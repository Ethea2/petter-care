import RegisterForm from '../../components/register/RegisterForm.tsx';
import RegisterAnimation from '../../components/register/RegisterAnimation.tsx';

const Register = () => {
    return (
        <>
            <div className='fixed flex justify-center items-center w-screen h-screen bg-gradient-to-r from-primary-blue to-accent3-purple'>
                <div className='flex w-[40%] items-center justify-center'>
                    <RegisterForm></RegisterForm>
                </div>
                <div className='flex w-[50%] items-center'>
                    <RegisterAnimation></RegisterAnimation>
                </div>
            </div>

        </>
    )
}

export default Register;

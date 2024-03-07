const SignInAnimation = () => {
    return (
        <>
        <div>
            {/* Marni */}
            <img className='fixed left-[22%] bottom-[-10%] floating-image' src="/sprites/marni.png"/> {/* TODO: Fix shrinking for Marni */}
            {/* Medal */}
            <img className='fixed left-[45%] top-[45%] h-1/6 floating-image' src="/sprites/img1.svg"/>
            {/* Calendar */}
            <img className='fixed left-[42%] top-[3%] h-1/5 floating-image' src="/sprites/img2.svg"/>
            {/* Board */}
            <img className='fixed h-1/5 left-[12%] top-[29%] floating-image' src="/sprites/img3.svg"/>
            {/* Paw */}
            <img className='fixed h-1/5 left-[17%] top-[72%] floating-image' src="/sprites/img5.svg"/>
        </div>
        </>
    )
}

export default SignInAnimation;
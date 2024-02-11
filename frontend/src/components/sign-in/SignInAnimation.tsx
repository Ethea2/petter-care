const SignInAnimation = () => {
    return (
        <>
        <div>
            {/* Marni */}
            <img className='fixed left-[12%] bottom-[-10%] floating-image' src="/sprites/marni.png"/> {/* TODO: Fix shrinking for Marni */}
            {/* Medal */}
            <img className='fixed left-[35%] top-[45%] h-1/6 floating-image' src="/sprites/img1.svg"/>
            {/* Calendar */}
            <img className='fixed left-[32%] top-[3%] h-1/5 floating-image' src="/sprites/img2.svg"/>
            {/* Board */}
            <img className='fixed h-1/5 left-[2%] top-[29%] floating-image' src="/sprites/img3.svg"/>
            {/* Paw */}
            <img className='fixed h-1/5 left-[7%] top-[72%] floating-image' src="/sprites/img5.svg"/>
        </div>
        </>
    )
}

export default SignInAnimation;
import PetAcc from '../../components/profile/PetAcc'
import AddPet from '../../components/profile/AddPet'

const PetAccess = () => {
    return (
        <>
            <div className='flex justify-center items-center bg-gradient-to-r from-primary-blue to-accent3-purple h-screen'>
                <PetAcc />
                <AddPet />
            </div>
        </>
    )
}

export default PetAccess

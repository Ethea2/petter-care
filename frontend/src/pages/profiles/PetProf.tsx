import PetCard from '../../components/profile/PetCard.tsx'
import PetRecords from '../../components/profile/PetRecords.tsx'

const PetProf = () => {
    return (
        <>
            <div className='flex px-40 py-10 h-screen w-screen bg-gradient-to-r from-primary-blue to-accent3-purple'>
                <div className="lg:w-[25%] xl:w-[25%] 2xl:w-[25%] space-y-10">
                    <PetCard />
                </div>
                <div className="lg:w-[65%] xl:w-[75%] 2xl:w-[80%] pl-10">
                    <PetRecords />
                </div>
            </div>
        </>
    )
}

export default PetProf

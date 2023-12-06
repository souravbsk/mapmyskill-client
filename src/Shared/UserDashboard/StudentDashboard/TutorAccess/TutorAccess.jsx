import React from 'react'
import AccessOptionCard from '../AccessOptionCard/AccessOptionCard'

const TutorAccess = () => {
    return (
        <div className='px-4'>
            <div className='border bg-white px-4'>
                <h1 className='text-center font-semibold text-2xl border-b p-5'>Buy Tutor Access</h1>
                <p className='  font-normal text-justify p-4'>Posting tuition requirement is absolutely FREE on LearnPick and you'll get responses from many tutors and tuition centres. However, if you want a quick turnaround time we suggest you buy tutor access and contact tutors as and when required with complete privacy.</p>
                <div className="grid sm:grid-cols-1 py-4 md:grid-cols-1 lg:grid-cols-3 gap-4">
                    <AccessOptionCard
                        option="Option 1"
                        lione="Contact any 10 tutors or institutes of your choice in any categories."
                        litwo="You can utilize this feature any time you need a tutor during the next 12 months."
                        lithree="Your contact number will remain private and will not be accessible by other members."
                    ></AccessOptionCard>

                    <AccessOptionCard
                        option="Option 2"
                        lione="Contact any 10 tutors or institutes of your choice in any categories."
                        litwo="You can utilize this feature any time you need a tutor during the next 12 months."
                        lithree="Your contact number will remain private and will not be accessible by other members."
                    ></AccessOptionCard>

                    <AccessOptionCard
                        option="Option 3"
                        lione="Contact any 10 tutors or institutes of your choice in any categories."
                        litwo="You can utilize this feature any time you need a tutor during the next 12 months."
                        lithree="Your contact number will remain private and will not be accessible by other members."
                    ></AccessOptionCard>

                </div>



                <div className='px-4'>
                    <div className='border bg-white mb-7'>
                        <h1 className='text-lg text-center p-4 border-b'>Important Notice</h1>
                        <div className='flex p-4 border-b justify-between lg:flex-row flex-col gap-4'>
                            <p className='text-sm font-thin text-justify '>Apna Byte does not charge any commission from students and parents. If someone is asking for the same kindly write to us at support@ApnaByte.in for assistance</p>

                            <div className='text-center'> <button className='bg-green-500 border-black px-6 py-2 text-white hover:text-black'>Buy Access Now</button></div>

                        </div>
                    </div>

                </div>





            </div>
        </div>
    )
}

export default TutorAccess

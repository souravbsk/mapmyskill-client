import React from 'react'

function OnlineTuition() {
    return (
        <div>
            <div className='p-4 border-b-2 text-lg font-semibold bg-white '>Online Tuition</div>
            <div className=' bg-white p-4 flex flex-col gap-6 mb-9  border-b-2'>
                <div className='flex'>
                    <p className='font-semibold w-64'>Provide Online Tuition</p>
                    <div className=' w-[550px]'>Yes</div>
                </div>

                <div className='flex'>
                    <p className='font-semibold w-64'>Tools Used</p>
                    <div className=' w-[550px]'>
                    Not Provided</div>
                </div>

                <div className='flex '>
                    <p className='font-semibold w-64'>Online Hourly Fees</p>
                    <div className=' w-[550px]'>
                    Not Provided</div>
                </div>


            </div>
        </div>
    )
}

export default OnlineTuition

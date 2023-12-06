import React from 'react'

function OnlinePresence() {
    return (
        <div>
            <div className='p-4 border-b-2 text-lg font-semibold bg-white '>Online Presence</div>
            <div className=' bg-white p-4 flex flex-col gap-6 mb-9  border-b-2'>
                <div className='flex'>
                    <p className='font-semibold w-64'>Website URL</p>
                    <div className=' w-[550px]'> Not Provided</div>
                </div>

                <div className='flex'>
                    <p className='font-semibold w-64'>Facebook URL</p>
                    <div className=' w-[550px]'>
                        Not Provided</div>
                </div>

                <div className='flex '>
                    <p className='font-semibold w-64'>Twitter URL</p>
                    <div className=' w-[550px]'>
                        Not Provided</div>
                </div>

                <div className='flex '>
                    <p className='font-semibold w-64'>LinkedIn URL</p>
                    <div className=' w-[550px]'>
                        Not Provided</div>
                </div>

                <div className='flex '>
                    <p className='font-semibold w-64'>Instagram URL</p>
                    <div className=' w-[550px]'>
                        Not Provided</div>
                </div>


            </div>

        </div>
    )
}

export default OnlinePresence
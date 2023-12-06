import React from 'react'

const AccessOptionCard = ({option, lione , litwo , lithree}) => {
    return (
       
            <div className='flex flex-col bg-white border '>
                <div className='text-2xl text-center font-semibold border-b-2 px-5 py-4 '>{option}</div>
                <div className='px-6 py-2'>
                    <ul className='list-disc font-thin '>
                        <li className='mb-3 '>(1) { lione }</li>
                        <li className='mb-3'>(2) {litwo}</li>
                        <li>(3) {lithree}</li>
                    </ul>
                </div>
            </div>



       
    )
}

export default AccessOptionCard

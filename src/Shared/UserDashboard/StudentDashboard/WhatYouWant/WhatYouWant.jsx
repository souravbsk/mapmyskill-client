import React from 'react'

const WhatYouWant = () => {
  return (
    <div className=' p-10 '>
      <h1 className='text-3xl text-center font-bold mb-6 text-white'>Tell us what you want</h1>
      <div className=' text-gradient-to-r from-indigo-500 text-justify text-white'>Do you need a tutor for your child or yourself? Tell us your learning needs and we can help you find matching tutors near your area just under 60 seconds. Simply fill up a short form or email us at <span className='text-blue-300 cursor-pointer hover:text-red-400'>support@mapmyskill</span> .in to tell us what you are looking for. The more details you give us the quicker and easier will it be for you to get a suitable tutor or institute.
      </div>
      <div className='text-center mt-9'>
      <button className='bg-blue-500 px-6 py-2 text-white'>Post Your Requirement</button>
      </div>
    </div>
  )
}

export default WhatYouWant

import React from 'react'
import bannerimg from '../../../../assets/images/banner6.png'

function NewBanner() {
  return (

    <section className=' mb-10 py-12 mt-16  xl:pt-12 xl:pb-12 overflow-hidden'>
    <div className='container mx-auto h-full'>
      <div className='flex flex-col xl:flex-row items-center justify-between h-full xl:px-10'>
      
        <div className='xl:w-[48%] text-center xl:text-left '  data-aos="fade-right"  data-aos-duration="1000">
          <div className='uppercase bg-blue-300 rounded px-5 py-2 w-max mb-[26px] mx-auto font-medium text-xl tracking-[2.24px] xl:mx-0 text-white'>live your life</div>
          <h1 className='mb-5 font-bold uppercase text-4xl'>this is title</h1>
          <p className='mb-[40px] md:max-w-xl text-lg text-gray-600'>
            Tutoring is private academic support, usually provided by an expert teacher; someone with deep knowledge or defined expertise in a particular subject or set ...
          </p>

          <button className=' mx-auto xl:mx-0 px-14 active:bg-sky-600 shadow-2xl hover:border hover:text-black text-xl text-white py-2 bg-sky-500 rounded '>click to hire a tutor </button>
        </div>


        <div className='' data-aos="fade-left"   data-aos-duration="1000">
          <img src={bannerimg} alt="" />
        </div>

      </div>
    </div>
  </section>
  )
}

export default NewBanner

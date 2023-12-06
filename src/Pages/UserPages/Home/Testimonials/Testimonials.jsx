import React from 'react'
import bannerimg from '../../../../assets/images/banner6.png'

function Testimonials() {
  return (
    <section className='testimonials rounded-lg mt-28  mb-20 bg-gradient-to-r from-black bg-cover bg-right bg-no-repeat py-12 xl:min-h-[595px} xl:py-5'>

    <div className='container mx-auto'>
      <div>
        <div className=' xl:flex  xl:px-10'>
          <img src={bannerimg} alt="" />

          <div className='h-full flex flex-col justify-center items-start xl:px-24 my-auto'>
            <div className='max-w-[680px] mx-auto text-center xl:text-left'>

              <div className='text-4xl font-bold text-left mb-3'>Teach What You Love</div>

              <p className='font-light relative text-[22px] leading-[198%] text-center xl:text-left'>
                <span>
                  Not getting enough time to study? Explore the best local or online classes for different subjects,
                  from basic to advanced: your all learning needs will be covered here. So, what are you waiting for? Start now!
                </span>
              </p>
              <div className='text-2xl font-bold mt-5'>james rodrigo</div>
              <div className='text-2xl font-thin'>customer</div>

            </div>

          </div>


        </div>
      </div>
    </div>
  </section>
  )
}

export default Testimonials
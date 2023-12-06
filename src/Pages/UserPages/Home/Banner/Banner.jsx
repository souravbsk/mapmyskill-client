import React from 'react';
import banner from '../../../../assets/images/banner6.png'
const Banner = () => {
    return (

    <div className="mt-12 sm:mt-36 containerCl">
    <div className="flex flex-col md:flex-row items-center justify-between gap-3 mx-auto">
      <div className="flex-1 items-center">
        <div className="mt-6 text-center space-y-6 p-5 sm:text-left">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-semibold">
            Find tutors and coaching centers near you
          </h2>
          <p className="!text-left text-base md:text-xl">
            We can help you find matching tutors and coaching institutes in just under 60 seconds.
          </p>
          <button className="bg-red-600 text-white font-semibold py-2 px-4">
            Get Started
          </button>
        </div>
      </div>
      <div className="flex-1 justify-center">
        <img className="book-logo h-64 md:h-auto" src={banner} alt="Book Logo" />
      </div>
    </div>
  </div>
    );
};

export default Banner;
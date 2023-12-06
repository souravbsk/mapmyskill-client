import React from "react";
const Banner2 = () => {
  return (
  
      <div className="bg-gradient-to-r  from-black to-gray-300 rounded-lg my-28 mx-0 py-10 px-5">
        <div className="inner-banner">
          <div className="text-box mx-4 md:mx-10  space-y-2 md:space-y-6">
            <h2 className="text-white text-2xl md:text-5xl  font-semibold" data-aos="fade-left"  data-aos-duration="500">
              You Can Become
            </h2>
            <h2 className="text-white text-2xl md:text-5xl font-semibold" data-aos="fade-left"  data-aos-duration="500">
              a great private tutor too!
            </h2>
            <p className=" !text-left text-white text-base sm:text-xl md:text-2xl" data-aos="fade-left"  data-aos-duration="700">
              Share your knowledge, live off your passion, and be your own boss
            </p>
            <div>
              <button className="bg-sky-500 mt-4 md:mt-8 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg" data-aos="fade-left"  data-aos-duration="1000">
                Find out more
              </button>
            </div>
          </div>
        </div>
      </div>

  );
};

export default Banner2;

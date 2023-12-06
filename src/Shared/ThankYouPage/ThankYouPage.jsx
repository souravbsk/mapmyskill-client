import React from "react";
import thanku from "../../assets/images/thank u1.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const ThankYouPage = () => {
  const { state } = useLocation();

  console.log(state, "thank page");

  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 md:gap-7 gap-7 lg:gap-0 p-5">
      <div className="flex justify-center">
        <img src={thanku} width="500px"></img>
      </div>

      <div>
        <div className="lg:pb-10 md:pb-8 pb-4 ">
          <h1
            className="lg:text-8xl text-blue-800 font-bold text-4xl md:text-8xl"
            data-aos="fade-left"
            data-aos-duration="1500"
          >
            Thank You!
          </h1>
          <h2
            className="lg:text-3xl text-blue-800 font-bold text-xl md:text-4xl"
            data-aos="fade-left"
            data-aos-duration="1500"
          >
            You are very much appreciated!
          </h2>
        </div>
        <div>
          <h3
            className="text-2xl font-bold mb-4 md:text-3xl"
            data-aos="fade-left"
            data-aos-duration="1500"
          >
            Benefits you can get
          </h3>
          <ui
            className="font-normal lg:text-base md:text-xl text-gray-900"
            data-aos="fade-left"
            data-aos-duration="1500"
          >
            <li className="mb-2">
              Connect with 10 experienced tutors for personalized guidance and
              support.
            </li>
            <li className="mb-2">
              Enjoy a full year of unrestricted access to our educational
              resources.
            </li>
            <li className="mb-2">
              Reach out to tutors on your schedule, ensuring timely assistance.
            </li>
            <li className="mb-2">
              Experience prompt and efficient responses from our dedicated
              tutors.
            </li>
            <li className="mb-2">
              Your privacy is paramount; say goodbye to unwanted calls and enjoy
              full confidentiality
            </li>
            <li className="mb-2">
              Our transparent pricing policy ensures no commissions or hidden
              fees.
            </li>
            <li className="mb-2">
              Gain access to exclusive PPT slides to enhance your learning
              experience.
            </li>
          </ui>
        </div>
        <div>
          <Link to={`/`}>
            <button className="bg-blue-600 lg:py-2 lg:px-7 py-2 px-7 md:py-4 md:px-14 md:text-xl lg:text-base text-center text-white lg:mt-6 mt-2 hover:bg-blue-700 active:bg-blue-800">
              go back home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;

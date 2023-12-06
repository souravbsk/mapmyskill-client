import React from "react";
const Request = () => {
  return (
    <div className="request containerCl mx-auto my-16 flex flex-col items-center justify-center">
      <h2 className="text-center text-2xl md:text-4xl">
        Request a Tutor for Free
      </h2>
      <p className="text-base sm:text-lg md:text-xl lg:w-3/5 text-center mt-8">
        Crack exams, learn new skills, improve grades with the help of great
        teachers. Post your learning needs and let qualified tutors get in touch
        with you.
      </p>
      <button className="bg-sky-500 text-white font-semibold sm:py-3 sm:px-6 py-2 px-4 mt-8">
        Post a learning requirement
      </button>
    </div>
  );
};

export default Request;

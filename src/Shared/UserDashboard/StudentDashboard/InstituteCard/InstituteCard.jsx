import React from "react";
import tutorimg from "../../../../assets/images/images.jpeg";

const InstituteCard = ({ name, location, code, information }) => {
  return (
    <div className=" w-[358px] h-[270px] flex justify-center items-center ">


      <div className="flex flex-col border-2  p-6 gap-3 bg-white shadow-lg hover:bg-[#040936] hover:text-white hover:cursor-pointer w-[328px] h-[240px] hover:w-[344px] hover:h-[270px] transition duration-400 ease-in-out hover:p-7  ">
        <div className="flex gap-8">
          <div className=" ">
            <h1 className="font-semibold text-lg">{name}</h1>

            <div className="text-sm font-semibold">{location}</div>
          </div>
          <div className="flex gap-2 flex-col">
            <div>
              <img src={tutorimg} className="h-[80px] w-[200px] rounded-sm " />
            </div>
            <div className="text-center font-semibold">{code}</div>
          </div>
        </div>
        <div className="font-normal text-sm">
          <span className="font-bold">teacher:</span> {information}
        </div>
      </div>


    </div>
  );
};

export default InstituteCard;

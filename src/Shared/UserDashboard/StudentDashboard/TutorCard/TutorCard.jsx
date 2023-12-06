import React from "react";
import tutorimg from "../../../../assets/images/images.jpeg";

const TutorCard = ({ allData }) => {


  console.log("allData?.profileimagepath",allData?.profileimagepath);

  return (
    <div className="  flex justify-center items-center ">
      
      <div className="flex flex-col border-2   p-4  gap-3 bg-white shadow-lg hover:bg-[#040936] hover:text-white hover:cursor-pointer scale-100 transition duration-300 ease-in-out hover:scale-105 ">
        <div className="flex gap-16">
          <div className=" ">
            <h1 className="font-semibold text-lg">{allData?.name}</h1>
         
            <div className="text-sm font-semibold">{allData?.dob}, {allData?.gender}</div>
            <div className="text-sm font-semibold">{allData?.address1}</div>
            <div className="text-sm font-semibold">{allData?.experience}</div>
            {/* <div className="text-sm font-semibold">{education}</div> */}
          </div>
          <div className="flex gap-2 flex-col">
            <div>
              
              <img src={`http://localhost:8080/${allData?.profileimagepath}`} className="h-[80px] w-[80px] rounded-sm" />
            </div>
            <div className="text-center font-semibold">{`# ${allData?.userid}`}</div>
          </div>
        </div>
        <div className="font-normal text-sm">
          <span className="font-bold">Segments: </span>
          {
            allData.segments?.map((items,i) => (
              <span key={i}>{` ${items.segmentname},`}</span>
            ))
          }

        </div>
        <div className="font-normal text-sm">
          <span className="font-bold">Teaches: </span>
          {
            allData?.segments.map((items,i) => (
              <span key={i}>{` ${items.subjects},`}</span>
            ))
          }

        </div>
      </div>

    </div>
  );
};

export default TutorCard;

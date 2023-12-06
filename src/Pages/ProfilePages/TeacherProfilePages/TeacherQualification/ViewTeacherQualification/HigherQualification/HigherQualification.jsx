import React from "react";
import HigherQualificationBlock from "../../../../../../components/HigherQualificationBlock/HigherQualificationBlock";

const HigherQualification = ({ schoolingQualificationData }) => {
  return (
    <div className="border  rounded-md  shadow-lg ">
      <div className="bg-[#ACC8E5] pt-3 pl-3">
      <h1 className="text-lg font-semibold  ">Higher Qualification</h1>

      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 p-3 bg-[#ACC8E5]">
        {schoolingQualificationData &&
          schoolingQualificationData?.educationData?.map((education, i) => (

            <div>
            <HigherQualificationBlock
            key={i}
            education={education}
          ></HigherQualificationBlock>
            </div>    
         

          ))}
      </div>

    </div>
  );
};

export default HigherQualification;

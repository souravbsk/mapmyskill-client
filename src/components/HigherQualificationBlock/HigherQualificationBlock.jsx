import React from "react";
import { FaTrash } from "react-icons/fa";

const HigherQualificationBlock = ({ education }) => {
  return (
    <>
      <hr className="mt-3" />
      <div className="my-4  space-y-2 ">
        <div className="flex gap-5 items-center">
          <p className="font-medium ">Qualification level:</p>
          <p className="text-sm">{education?.level_Name}</p>
        </div>
        <div className="flex gap-5 items-center">
          <p className="font-medium ">Specialization :</p>
          <p className="text-sm">{education?.specialization_Name}</p>
        </div>
        <div className="flex gap-5 items-center">
          <p className="font-medium ">Institution Name :</p>
          <p className="text-sm">{education?.institutionName_Name}</p>
        </div>
        <div className="flex gap-5 items-center">
          <p className="font-medium ">Institution Address:</p>
          <p className="text-sm">{education?.InstitutionAddress}</p>
        </div>
        <div className="flex gap-5 items-center">
          <p className="font-medium ">University:</p>
          <p className="text-sm">{education?.university_Name}</p>
        </div>

        <div className="flex gap-5 items-center">
          <p className="font-medium ">Medium Of Instruction :</p>
          <p className="text-sm">{education?.mediumofInstruction_Name}</p>
        </div>
        <div className="flex gap-5 items-center">
          <p className="font-medium ">Course Type:</p>
          <p className="text-sm">{education?.coursetype_Name}</p>
        </div>
        {/* <div className="text-right">
          <button className="text-red-600">
            <FaTrash size={22}></FaTrash>
          </button>
        </div> */}
      </div>
    </>
  );
};

export default HigherQualificationBlock;

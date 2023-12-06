import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaSchool } from "react-icons/fa";
import teacher from "../../../../../../assets/images/teacher-icon.png";
const TeacherSubjectBlock = ({ segmentdata }) => {
  console.log(segmentdata, "segment Data");
  return (
    <div className=" rounded  gap-6 px-5 flex items-center  bg-gradient-to-r from-[#040936] to-[#0EA5E9] mt-5  shadow-xl">
      <div className="mx-auto flex-grow-0">
        <div className="py-3 ">
          {/* <FaSchool size={70}></FaSchool> */}
          <img src={teacher} height="200px"></img>
        </div>
      </div>

      <div className="p-3 space-y-2 flex-1">
        <div>
          <h2 className="text-2xl  font-semibold   text-white">
            {segmentdata?.categoryName}
          </h2>
        </div>
        <div>
          <h2 className="text-lg  font-medium  text-white ">
            {segmentdata?.segment_name}
          </h2>
        </div>

        <div>
          <div className="flex items-center gap-5">
            <h3 className="text-lg font-medium text-white">Subjects:</h3>
            <p>
              {segmentdata &&
                segmentdata?.subjectData?.map((subjectItem, i) => (
                  <span key={subjectItem?.subject_id} className=" text-white">
                    {subjectItem?.subject_name},
                  </span>
                ))}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <h3 className="text-lg  font-medium text-white">Boards:</h3>
            <p>
              {segmentdata &&
                segmentdata?.boardData?.map((board, i) => (
                  <span key={board?.listItemId} className=" text-white">{board?.listItemName}, </span>
                ))}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <h3 className="text-lg  font-medium text-white">Price:</h3>
            <p className=" text-white">${segmentdata?.price}</p>
          </div>

          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default TeacherSubjectBlock;

import React from "react";

const SchoolingBackgroundBlock = ({ schoolingBg }) => {
  return (
    <>
      <hr className="mt-3" />
      <div className="my-4  space-y-2">
        <div className="flex gap-5 items-center">
          <p className="font-medium ">level:</p>
          <p className="text-sm">
            {schoolingBg?.level.toLowerCase() === "m"
              ? "10th"
              : schoolingBg?.level.toLowerCase() === "i"
              ? "12th"
              : "not found"}
          </p>
        </div>
        <div className="flex gap-5 items-center">
          <p className="font-medium ">Board:</p>
          <p className="text-sm">{schoolingBg?.board_Name}</p>
        </div>
        <div className="flex gap-5 items-center">
          <p className="font-medium ">SchoolName:</p>
          <p className="text-sm">{schoolingBg?.schoolName}</p>
        </div>
        <div className="flex gap-5 items-center">
          <p className="font-medium ">School Address:</p>
          <p className="text-sm">{schoolingBg?.schoolAddress}</p>
        </div>
        <div className="flex gap-5 items-center">
          <p className="font-medium ">Passing Year:</p>
          <p className="text-sm">{schoolingBg?.passingYear}</p>
        </div>
      </div>
    </>
  );
};

export default SchoolingBackgroundBlock;

import moment from "moment/moment";
import React from "react";

const ViewTeacherPersonalInformation = ({ personalInfo }) => {
  //console.log(personalInfo, "personalInfo");
  return (
    <div className="space-y-3 ">
      <div className="flex gap-5 items-center">
        <p className="font-medium ">Marital:</p>
        <p className="text-sm">{personalInfo?.Marital}</p>
      </div>
      <div className="flex gap-5 items-center">
        <p className="font-medium ">Privacy:</p>
        <p className="text-sm">{personalInfo?.Privacy}</p>
      </div>
      <div className="flex gap-5 items-center">
        <p className="font-medium ">Vehicle:</p>
        <p className="text-sm">{personalInfo?.Vehicle}</p>
      </div>
      <div className="flex gap-5 items-center">
        <p className="font-medium ">DateOfBirth:</p>
        <p className="text-sm">
          {moment(personalInfo?.dateofbirth).format("YYYY-MM-DD")}
        </p>
      </div>
      <hr />
      <div className="flex gap-5 items-center">
        <p className="font-medium ">Facebook Link:</p>
        <p className="text-sm">{personalInfo?.facebookLink}</p>
      </div>
      <div className="flex gap-5 items-center">
        <p className="font-medium ">Linkedin Link:</p>
        <p className="text-sm">{personalInfo?.linkedinLink}</p>
      </div>
      <div className="flex gap-5 items-center">
        <p className="font-medium ">Linkedin Link:</p>
        <p className="text-sm">{personalInfo?.linkedinLink}</p>
      </div>
      <div className="flex gap-5 items-center">
        <p className="font-medium ">Google Link:</p>
        <p className="text-sm">{personalInfo?.googleLink}</p>
      </div>
    </div>
  );
};

export default ViewTeacherPersonalInformation;

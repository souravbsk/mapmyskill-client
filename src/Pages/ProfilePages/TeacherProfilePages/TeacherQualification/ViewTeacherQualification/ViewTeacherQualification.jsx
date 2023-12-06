import React from "react";
import SchoolingBackground from "./SchoolingBackground/SchoolingBackground";
import HigherQualification from "./HigherQualification/HigherQualification";
import TeacherLanguage from "./TeacherLanguage/TeacherLanguage";

const ViewTeacherQualification = ({ schoolingQualificationData }) => {
  return (
    <div className="space-y-4">
      <SchoolingBackground
        schoolingQualificationData={schoolingQualificationData}
      ></SchoolingBackground>
      <HigherQualification
        schoolingQualificationData={schoolingQualificationData}
      ></HigherQualification>
      <TeacherLanguage
        schoolingQualificationData={schoolingQualificationData}
      ></TeacherLanguage>
    </div>
  );
};

export default ViewTeacherQualification;

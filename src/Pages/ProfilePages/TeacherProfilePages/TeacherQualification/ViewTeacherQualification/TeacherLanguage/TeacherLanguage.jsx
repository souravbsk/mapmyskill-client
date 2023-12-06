import React from "react";

const TeacherLanguage = ({ schoolingQualificationData }) => {
  return (
    <div className="border  rounded-md shadow-lg">
      <div className="border-b p-3 bg-[#ACC8E5]">
      <h1 className="text-lg font-semibold">Language</h1>

      </div>

      <div>
      <ul className="space-y-1 p-3 bg-[#ACC8E5]">
        {schoolingQualificationData &&
          schoolingQualificationData?.languageData?.map((schoolingBg, i) => (
            <li key={i}>{schoolingBg?.listItemName},</li>
          ))}
      </ul>
      </div>

    </div>
  );
};

export default TeacherLanguage;

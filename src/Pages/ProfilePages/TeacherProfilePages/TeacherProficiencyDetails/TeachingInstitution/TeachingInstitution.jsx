import React from "react";

const TeachingInstitution = ({ ProficiencyDetails }) => {
  return (
    <div className="border-2 space-y-3 border-gray-200 px-2 py-2 rounded bg-[#ACC8E5]">
      <div className="flex items-center gap-6">
        <h3 className="font-medium">University Name:</h3>
        <p>{ProficiencyDetails?.university}</p>
      </div>
      <div className="flex items-center gap-6">
        <h3 className="font-medium">University Location:</h3>
        <p>{ProficiencyDetails?.location}</p>
      </div>
      <div className="flex items-center gap-6">
        <h3 className="font-medium">Period of service:</h3>
        <p>{ProficiencyDetails?.service_period}</p>
      </div>
    </div>
  );
};

export default TeachingInstitution;

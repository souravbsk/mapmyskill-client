import React from "react";

const TeacherProficiencyDetailsBlocks = ({ ProficiencyDetails }) => {

  return (
    <div className="px-4 py-4 rounded bg-[#ACC8E5]  border-2">
      <div>
        <h3 className="font-medium">Training Approach and Experience</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: ProficiencyDetails?.trainingapproach,
          }}
        ></div>
      </div>

      <div className="flex items-center gap-5 mt-6">
        <h3 className="font-medium">Total Experience:</h3>
        <p>{ProficiencyDetails?.experience}</p>
      </div>

      <div className="flex items-center gap-5 mt-6">
        <h3 className="font-medium">
          experience teaching in school/ Institution or College:
        </h3>
        <p>{ProficiencyDetails?.hasteachingexp}</p>
      </div>
    </div>
  );
};

export default TeacherProficiencyDetailsBlocks;
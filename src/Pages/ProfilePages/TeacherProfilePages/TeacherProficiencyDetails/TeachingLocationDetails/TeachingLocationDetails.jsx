import React from "react";

const TeachingLocationDetails = ({ teachingLocation }) => {
  //console.log(teachingLocation, "teachinglocation");
  return (
    <div className="border-2 border-gray-200 px-2 py-2 rounded bg-[#ACC8E5]">
      <ul className="flex items-center gap-4 flex-wrap">
        {teachingLocation &&
          teachingLocation.map((location) => (
            <li key={location?.listitemid}>{location?.listItemName}, </li>
          ))}
      </ul>
    </div>
  );
};

export default TeachingLocationDetails;

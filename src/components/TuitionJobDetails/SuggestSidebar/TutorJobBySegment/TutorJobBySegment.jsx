import React from "react";
import { Link } from "react-router-dom";

const TutorJobBySegment = () => {
  return (
    <div className="p-4 border">
      <h1 className="text-black mb-3 font-medium">Tutor Jobs by Segments</h1>
    <ul className="text-gray-500  border-t text-sm ">
        <li className="mt-4 list-decimal list-inside"><Link to="/">Class 1 - 5</Link></li>
        <li className="mt-4 list-decimal list-inside"><Link to="/">Class 1 - 5</Link></li>
        <li className="mt-4 list-decimal list-inside"><Link to="/">Class 1 - 5</Link></li>
    </ul>
    </div>
  );
};

export default TutorJobBySegment;

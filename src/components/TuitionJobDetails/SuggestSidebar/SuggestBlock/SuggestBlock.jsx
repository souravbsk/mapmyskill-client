import React from "react";
import { FaMapMarkerAlt, FaTag, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const SuggestBlock = ({ job }) => {
  console.log(job);
  return (
    <Link to={`/myaccount/tuitionpost/${job?.id}`}>
    <div className="border  p-4">
      <div className="space-y-2">
        <h5 className="text-black font-medium">
          Searching for All Subjects Tutor
        </h5>
        <p className="flex items-center gap-2 text-sm text-gray-500">
          <FaMapMarkerAlt></FaMapMarkerAlt>{" "}
          {job?.addressone.split(0, 10) + " " + "..."}
        </p>
        <p className="flex items-center gap-2 text-sm text-gray-500">
          <FaTag></FaTag>{" "}
          {job?.subjects.map((item) => (
            <small key={item?.id}>{item?.name}</small>
          ))}
        </p>
        <p className="flex items-center gap-2 text-sm text-gray-500">
          <FaUser></FaUser>
          {job?.username}
        </p>
      </div>
      <div className="border-t my-2"></div>
      <div className="text-sm flex items-center justify-between text-gray-500">
        <p>#{job?.id}</p>
      </div>
    </div>
    </Link>
  );
};

export default SuggestBlock;

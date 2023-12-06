import React from "react";
import { Link } from "react-router-dom";

const MonitoringCategoryDiv = ({ link, icon, iconBG, text, monitorCount }) => {
  return (
    <Link to={link}>
      <div
        className="flex p-3 rounded-2xl border items-center gap-9 shadow-lg  bg-gradient-to-r from-[#040936] to-blue-500 hover:cursor-pointer  "
        data-aos="zoom-in-up"
        data-aos-duration="1000"
      >
        <div>
          <p className={`text-2xl px-7 py-7 text-white rounded-md ${iconBG}`}>
            {icon}
          </p>
        </div>
        <div>
          <p className="text-white">{monitorCount}</p>
          <p className="text-center text-white text-sm ">{text}</p>
        </div>
      </div>
    </Link>
  );
};

export default MonitoringCategoryDiv;

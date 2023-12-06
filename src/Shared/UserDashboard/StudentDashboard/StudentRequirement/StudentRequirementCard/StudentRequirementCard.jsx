

import React from "react";
import { BsPhone } from "react-icons/bs";
import { FaEye, FaMapMarkerAlt } from "react-icons/fa";
import { GiSelfLove } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import img from "../../../../../assets/images/teacher-icon.png";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function StudentRequirementCard({ studentLevel }) {
 
  return (
    <div className=" flex flex-col border-2">
      {studentLevel.map((items, i) => (
        <div key={i}>
          <div className="flex gap-10 lg:flex-row md:flex-col flex-col p-4">
            <div className="   px-8 py-4">
              <div className="mx-auto py-11">
                <img src={img} className="h-[250px] w-[200px] " />
              </div>
            </div>

            <div
              className="border lg:w-4/5 bg-[#ACC8E5] shadow-lg "
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-anchor-placement="center-bottom"
            >
              <div className=" border-b p-4 ">
                <div className="flex items-center gap-3">
                  <h3 className=" font-bold text-lg text-white">
                    Seeking Tutor
                  </h3>
                  <button>
                    <GiSelfLove></GiSelfLove>
                  </button>
                </div>

                <div className="flex justify-between">
                  <div className="mt-4 text-gray-500 space-y-2">
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt></FaMapMarkerAlt>{" "}
                      <span className="text-[#141414]">
                        {items?.address2 + ", " + items?.address1}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaEye></FaEye>{" "}
                      <span className="text-[#141414]">Viewed by: </span>
                    </p>
                  </div>

                  <div className="">
                    <button className="py-1 px-3 bg-slate-200 lg:text-xs text-[10px]">
                      Report Fake
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <p className="font-bold text-lg text-white">
                  {items?.requirementdesc}
                </p>
                <div className="flex mt-3 flex-wrap">
                  <div className="w-1/2 mb-2 lg:w-1/6 xl:w-1/6 md:w-1/4">
                    <p className="text-sm font-medium text-white">Segment:</p>
                  </div>
                  <div className="w-1/2 mb-2 lg:w-5/6 xl:w-5/6 md:w-3/4">
                    <p className="text-sm text-white">{items?.segmentName} </p>
                  </div>
                  <div className="w-1/2 mb-2 lg-w-1/6 xl:w-1/6 md:w-1/4">
                    <p className="text-sm font-medium text-white">Subject:</p>
                  </div>

                  {items.subjects.map((subjects, i) => (
                    <div key={i} className="">
                      <p className="text-sm text-white pr-2">
                        {subjects?.name},
                      </p>
                    </div>
                  ))}

                  <div className="w-1/2 mb-3 lg:w-1/6 xl:w-1/6 md:w-1/4">
                    <p className="text-sm font-medium text-white">
                      Location Preference:
                    </p>
                  </div>
                  <div className="w-1/2 mb-3 lg:w-5/6 xl:w-5/6 md:w-3/4">
                    <p className="text-sm text-white">{items?.locationName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-2 p-4   border-t border-b mt-5  bg-blue-200 ">
              <p className="flex  items-center gap-2">
                <MdEmail size={20}></MdEmail>
                <h1 className="text-xl">
                  {" "}
                  Email:{" "}
                  <span className="text-xl text-blue-900">{items?.email}</span>
                </h1>
              </p>
              <p className="flex items-center gap-2">
                <BsPhone size={20}></BsPhone>
                <h1 className="text-xl">
                  {" "}
                  Mobile:{" "}
                  <span className="text-xl text-blue-900">
                    {" "}
                    {items?.mobile}
                  </span>
                </h1>
              </p>
            </div>

            <div className="px-5 flex items-center  justify-between bg-black rounded py-5 mb-5 border">
              <small className="text-white"></small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentRequirementCard;

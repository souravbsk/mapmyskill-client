import React from "react";
import img from "../../../../assets/images/profile.png";
import { GiSelfLove } from "react-icons/gi";
import { Link } from "react-router-dom";
import { FaEye, FaMapMarkerAlt, FaUnlock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsPhone } from "react-icons/bs";

const ContactViewedBlock = () => {
  return (
    <div className=" flex flex-col">
      <div className="flex gap-10 lg:flex-row md:flex-col flex-col p-4">
        {/*image*/}
        <div className="flex flex-col gap-5  px-8 py-4">
          <div className="mx-auto">
            <img src={img} className="h-[200px] " />
          </div>
          <h1 className="text-2xl font-semibold text-center">Madhumita</h1>
        </div>

        {/*content*/}

        <div
          className="border lg:w-4/5 bg-[#ACC8E5] shadow-lg "
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-anchor-placement="center-bottom"
        >
          <div className=" border-b p-4 ">
            <div className="flex items-center gap-3">
              <Link>
                <h3 className=" font-bold text-lg text-white">
                  Urgently need a Trainer for English subject of Std-VIII
                </h3>
              </Link>
              <button>
                <GiSelfLove></GiSelfLove>
              </button>
            </div>

            <div className="flex justify-between">
              <div className="mt-4 text-gray-500 space-y-2">
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt></FaMapMarkerAlt>{" "}
                  <span className="text-[#141414]">
                    Kestopur, Kolkata, 4 days ago
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <FaEye></FaEye>{" "}
                  <span className="text-[#141414]">Viewed by 1 Person</span>
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
              I am looking for an experienced Trainer for English subject of
              Std-VIII.
            </p>
            <div className="flex mt-3 flex-wrap">
              <div className="w-1/2 mb-2 lg:w-1/6 xl:w-1/6 md:w-1/4">
                <p className="text-sm font-medium text-white">Segment:</p>
              </div>
              <div className="w-1/2 mb-2 lg:w-5/6 xl:w-5/6 md:w-3/4">
                <p className="text-sm text-white">Class 6 - 8</p>
              </div>
              <div className="w-1/2 mb-2 lg-w-1/6 xl:w-1/6 md:w-1/4">
                <p className="text-sm font-medium text-white">Subject:</p>
              </div>
              <div className="w-1/2 mb-2 lg:w-5/6 xl:w-5/6 md:w-3/4">
                <p className="text-sm text-white">Chemistry</p>
              </div>
              <div className="w-1/2 mb-3 lg:w-1/6 xl:w-1/6 md:w-1/4">
                <p className="text-sm font-medium text-white">
                  Location Preference:
                </p>
              </div>
              <div className="w-1/2 mb-3 lg:w-5/6 xl:w-5/6 md:w-3/4">
                <p className="text-sm text-white">
                  At Tutor's Place, At Student's Place, At Institute
                </p>
              </div>

              <div className="w-1/2 mb-3 lg:w-1/6 xl:w-1/6 md:w-1/4">
                <p className="text-sm font-medium text-white">Tuition Value:</p>
              </div>
              <div className="w-1/2 mb-3 lg:w-5/6 xl:w-5/6 md:w-3/4">
                <p className="text-sm text-white">INR 24000 (Approx.)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>

        <div className="space-y-2 p-4   border-t border-b mt-5  bg-blue-200 ">
          <p className="flex  items-center gap-2" >
            <MdEmail size={20}></MdEmail>
            <h1 className="text-xl">
              {" "}
              Email:{" "}
              <span className="text-xl text-blue-900"  >
                lucky_fddi@yahoo.co.in
              </span>
            </h1>
          </p>
          <p className="flex items-center gap-2">
            <BsPhone size={20}></BsPhone>
            <h1 className="text-xl">
              {" "}
              Mobile:{" "}
              <span className="text-xl text-blue-900">+919804747321</span>
            </h1>
          </p>
        </div>


        <div className="px-5 flex items-center  justify-between bg-black rounded py-5 mb-5 border">
          <small className="text-white">#615263</small>
        </div>

      </div>

    </div>
  );
};

export default ContactViewedBlock;

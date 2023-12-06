import React from "react";
import Header from "../Shared/Header/Header";
import { Link, NavLink, Outlet } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import NewFooter from "../Shared/NewFooter/NewFooter";
import TutoringDetails from "../components/DashbordComponents/TutoringDetails/TutoringDetails";
import TuitionSchedule from "../components/DashbordComponents/TuitionSchedule/TuitionSchedule";
import Teaches from "../components/DashbordComponents/Teaches/Teaches";
import OnlineTuition from "../components/DashbordComponents/OnlineTuition/OnlineTuition";
import OnlinePresence from "../components/DashbordComponents/OnlinePresence/OnlinePresence";
import useAuthChanged from "../Hooks/useAuthChanged";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./layout.css";

const DashboardLayout = () => {
  const { user } = useAuthChanged();

  return (
    <div>
      <Header></Header>
      <div className="profile  mt-32 container mb-7 bg-slate-100 px-4 py-2">
        
        <div className='mb-2'>
          <Link to={'/myaccount/dashboard'}>
            <button
              className="bg-[#0ea5e9] text-white py-1 pl-2 pr-4">
              <ArrowBackIcon className="text-white"></ArrowBackIcon>
              Back
            </button>
          </Link>
        </div>

        <h1 className="text-lg font-semibold mb-4">My Profile</h1>
        <div className="grid grid-cols-4  gap-4 ">
          <div className="">
            {user && user?.roleid == 4 ? (
              <ul className="flex gap-1 flex-col  px-5  ">
                <NavLink to="/myaccount/personal-information">
                  <li className="p-4  hover:bg-[#040936] hover:text-white  rounded-lg ">
                    Personal Information
                  </li>
                </NavLink>

                <NavLink to="/myaccount/contact-information">
                  <li className="p-4  hover:bg-[#040936] hover:text-white rounded-lg ">
                    Contact Information
                  </li>
                </NavLink>

                <NavLink to="/myaccount/upload-documents">
                  <li className="p-4  hover:bg-[#040936] hover:text-white rounded-lg ">
                    Upload Documents
                  </li>
                </NavLink>

                <NavLink to="/myaccount/reset-password">
                  <li className="p-4  hover:bg-[#040936] hover:text-white  rounded-lg">
                    Reset Password
                  </li>
                </NavLink>

                <NavLink to="/myaccount/delete-account">
                  <li className="p-4  hover:bg-[#040936] hover:text-white rounded-lg">
                    Delete Account
                  </li>
                </NavLink>
              </ul>
            ) : user?.roleid == 3 ? (
              <ul className="flex gap-2 flex-col  px-5  ">
                <NavLink to="/myaccount/basic-details">
                  <li className="p-4 hover:bg-[#040936] hover:text-white rounded-lg">
                    Basic Details
                  </li>
                </NavLink>

                <NavLink to="/myaccount/contact-information">
                  <li className="p-4  hover:bg-[#040936] hover:text-white rounded-lg ">
                    Contact Information
                  </li>
                </NavLink>

                <NavLink to="/myaccount/proficiency">
                  <li className="p-4  hover:bg-[#040936] hover:text-white rounded-lg">
                    Teaching Profiency Experience
                  </li>
                </NavLink>

                <NavLink to="/myaccount/qualification">
                  <li className="p-4  hover:bg-[#040936] hover:text-white rounded-lg ">
                    Qualification
                  </li>
                </NavLink>

                <NavLink to="/myaccount/personal-Info">
                  <li className="p-4  hover:bg-[#040936] hover:text-white rounded-lg ">
                    Personal Information
                  </li>
                </NavLink>
                <NavLink to="/myaccount/upload-documents">
                  <li className="p-4  hover:bg-[#040936] hover:text-white rounded-lg ">
                    Upload Documents
                  </li>
                </NavLink>
                <NavLink to="/myaccount/reset-password">
                  <li className="p-4  hover:bg-[#040936] hover:text-white rounded-lg ">
                    Reset Password
                  </li>
                </NavLink>
                <NavLink to="/myaccount/delete-account">
                  <li className="p-4  hover:bg-[#040936] hover:text-white rounded-lg ">
                    Delete Account
                  </li>
                </NavLink>
              </ul>
            ) : null}
          </div>
          <div className="bg-slate-100 grid col-span-3">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      {/* <Footer></Footer> */}
      <NewFooter></NewFooter>
    </div>
  );
};

export default DashboardLayout;

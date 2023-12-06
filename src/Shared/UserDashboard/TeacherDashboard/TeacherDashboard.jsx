import React from "react";
import MonitorSection from "./MonitorSection/MonitorSection";
import MatchingTuitionJobs from "./MatchingTuitionJobs/MatchingTuitionJobs";
import ContactViewed from "./ContactViewed/ContactViewed";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  return (
    <div className="containerCl bg-slate-100">
      <MonitorSection></MonitorSection>

      <div className="border rounded-md bg-white">
        <div className="px-5 py-4 border-b flex items-center justify-between gap-3 bg-[#040936]">
          <h2 className="text-xl font-medium text-white">Matching Tuition Jobs</h2>
          <Link to={`/myaccount/tuition-jobs`} className="font-semibold  bg-[#49FD5B]  px-4 py-2 shadow-2xl">View All</Link>
        </div >
        <MatchingTuitionJobs></MatchingTuitionJobs>
      </div>

      <div className="border rounded-md mt-11 bg-white">
        <div className="px-5 py-4 border-b flex items-center justify-between gap-3 bg-[#040936]">
          <h2 className="text-xl font-medium text-white">Contact Viewed</h2>
          <button className="font-semibold  bg-[#49FD5B]  px-4 py-2">
            View All
          </button>
        </div>
        <ContactViewed></ContactViewed>
      </div>
    </div>
  );
};

export default TeacherDashboard;

import React, { useEffect, useState } from "react";
import TutoringDetails from "../../../components/DashbordComponents/TutoringDetails/TutoringDetails";
import TuitionSchedule from "../../../components/DashbordComponents/TuitionSchedule/TuitionSchedule";
import Teaches from "../../../components/DashbordComponents/Teaches/Teaches";
import OnlineTuition from "../../../components/DashbordComponents/OnlineTuition/OnlineTuition";
import OnlinePresence from "../../../components/DashbordComponents/OnlinePresence/OnlinePresence";
import DashboardLayout from "../../../layouts/DashboardLayout";
import MonitorSection from "../TeacherDashboard/MonitorSection/MonitorSection";
import TutorCard from "./TutorCard/TutorCard";
import StudentMonitorSection from "./StudentMonitorSection/StudentMonitorSection";
import TutorCardSection from "./TutorCardSection/TutorCardSection";
import InstituteSection from "./InstituteSection/InstituteSection";
import WhatYouWant from "./WhatYouWant/WhatYouWant";
import Requirement from "./Requirement/Requirement";
import AccessOptionCard from "./AccessOptionCard/AccessOptionCard";
import TutorAccess from "./TutorAccess/TutorAccess";
import useAuthChanged from "../../../Hooks/useAuthChanged";
import axios from "axios";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const { user } = useAuthChanged();
  const [studentLevel, setStudentLevel] = useState("");
  const [a, address, b] = studentLevel.split(",");

  const [studentLevelData, setStudentLevelData] = useState([]);
  const [studentLevelSegmentId, setStudentLevelSegmentId] = useState([]);
  const [unlockCount, setUnlockCount] = useState([])

  useEffect(() => {
    if (user) {
      axios
        .get(
          `http://localhost:8080/api/studentlevel/findallbyid/${user?.userid}`
        )
        .then((response) => {
          const allsegmentids = response?.data?.data.map(
            (requirement) => requirement?.segmentid
          );
          setStudentLevelData(response?.data?.data);
          response?.data
            ? setStudentLevel(response?.data?.data[0].address1)
            : null;
          setStudentLevelSegmentId(allsegmentids);
        })
        .catch((error) => {
          console.error("Error fetching segments:", error);
        });
    }
  }, [user]);


  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/contactsviewed/${user?.userid}`)
      .then((res2) => {
        // console.log("Res2", res2.data);
        // const filtered = res2.data.filter((item1) => {
        //   res1.data.includes(item1.viewedusers);
        // });
        // const filteredId = res2?.data?.map(item1 => item1.viewedusers)
        // const filteredUsers = res1?.data.filter(item2 => filteredId.includes(item2.userid))
        // setUnlockedContacts(filteredUsers)
        // console.log("filteredId", filteredId);
        // console.log("filteredUsers", filteredUsers);
        console.log("res2",res2.data)
        setUnlockCount(res2?.data?.length)
      })
      .catch((error) => {
        console.error("error fetching contactsviewed data ", error);
      });
  }, [user])


  


  return (
    <div className="bg-slate-100">
      <div className="flex lg:flex-row flex-col my-4  gap-[62px] px-4 pt-4">

        <div className=" ">
          <StudentMonitorSection
            studentLevelData={studentLevelData}
            unlockCount={unlockCount}
          ></StudentMonitorSection>
        </div>

        {/* ======================Tutors in current location section start================= */}
        <div className=" ">
          <div className=" bg-gradient-to-r from-blue-500 to-[#040936]  border ">
            <div className="flex justify-between  border-b-2 bg-[#040936]">
              <div className="text-xl font-bold px-5 py-4 text-white">
                Tutors in {address}
              </div>
              <div className="px-5 py-4">
                <Link to={"/myaccount/teachers"}>
                  <button className="px-3 py-1 bg-[#49FD5B]   text-sm ">
                    View All
                  </button>
                </Link>
              </div>
            </div>
            <div className="">
              {" "}
              <TutorCardSection
                studentLevelSegmentId={studentLevelSegmentId}
              ></TutorCardSection>
            </div>
          </div>
        </div>
        {/* ======================Tutors in current location section end================= */}


      </div>
      {/* =================Unlocked contacts section start================== */}
      {/* <div className="py-16 px-4 bg-slate-100">
        <div className="flex flex-col bg-gradient-to-r from-[#040936] to-blue-500  border">
          <div className="flex justify-between  border-b-2 bg-[#040936]">
            <div className="text-xl font-bold px-5 py-4 text-white">
              Unlocked Contacts
            </div>
            <div className="px-5 py-4">
              <Link to={"/myaccount/unlockedcontact"}>
                <button className="px-3 py-1 bg-[#49FD5B]   text-sm">
                  View All
                </button>
              </Link>
            </div>
          </div>
          <div className="px-4">
            <TutorCardSection
              studentLevelSegmentId={studentLevelSegmentId}
            ></TutorCardSection>

          </div>
        </div>
      </div> */}
      {/* =================Unlocked contacts section end================== */}


      <div className="py-16 px-4 bg-slate-100">
        <div className="flex flex-col bg-gradient-to-r from-[#040936] to-blue-500  border">
          <div className="flex justify-between  border-b-2 bg-[#040936]">
            <div className="text-xl font-bold px-5 py-4 text-white">
              Institute in Kolkota
            </div>
            <div className="px-5 py-4">
              <button className="px-3 py-1 bg-[#49FD5B]   text-sm">
                View All
              </button>
            </div>
          </div>
          <div className="px-4">
            {" "}
            <InstituteSection></InstituteSection>{" "}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 px-4 gap-4 pb-16">
        <div className=" border border-white shadow-inner  bg-gradient-to-r from-[#040936]">
          <WhatYouWant></WhatYouWant>
        </div>

        <div className="  bg-slate-100 ">
          <div className="flex flex-col bg-white border">
            <div className="flex justify-between  border-b-2 bg-[#040936]">
              <div className="text-lg font-bold px-5 py-4 w-64 text-white">
                My Active Requirement
              </div>
              <div className="px-5 py-4">
                <button className="px-3 py-1 bg-[#49FD5B]  text-sm">
                  View All
                </button>
              </div>
            </div>
            <div className="px-4   bg-[#ACC8E5]">
              {" "}
              <Requirement></Requirement>{" "}
            </div>
          </div>
        </div>
      </div>

      <div className=" ">
        <TutorAccess></TutorAccess>
      </div>
    </div>
  );
};

export default StudentDashboard;

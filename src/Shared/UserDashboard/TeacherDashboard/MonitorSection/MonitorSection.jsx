import React from "react";
import {
  FaArrowRight,
  FaEye,
  FaRegHandPointer,
  FaStar,
  FaUpload,
} from "react-icons/fa";
import { GiRoyalLove, GiSelfLove } from "react-icons/gi";
import { BiNotepad } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import MonitoringCategoryDiv from "../../../../components/MonitoringCategoryDiv/MonitoringCategoryDiv";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import useAuthChanged from "../../../../Hooks/useAuthChanged";
const MonitorSection = () => {
  const { user } = useAuthChanged();
  const [tuitionJobs, setTuitionJobs] = useState([]);
  const [enquiriesData, setEnquiriesData] = useState([]);
  const [totalReview, setTotalReview] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8080/api/studentlevel?user=${user?.userid}`)
        .then((jobRes) => {
          if (jobRes.statusText == "OK") {
            setTuitionJobs(jobRes?.data);
          }
        });

      axios
        .get(`http://localhost:8080/api/userreviews/${user?.userid}`)
        .then((reviewRes) => {
          console.log(reviewRes);
          if (reviewRes?.data?.success) {
            setTotalReview(reviewRes?.data?.data);
          }
        });

      axios
        .get(`http://localhost:8080/api/messagetoteacher/${user?.userid}`)
        .then((res) => {
          // console.log("enquiries", res.data)
          setEnquiriesData(res?.data);
        })
        .catch((error) => {
          console.log("Error fetching Enquiries data", error);
        });
    }
  }, [user]);

  console.log("enquiriesData", totalReview);

  return (
    <div className="grid sm:grid-cols-2 py-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <MonitoringCategoryDiv
        icon={<FaRegHandPointer></FaRegHandPointer>}
        iconBG="bg-[#17A2B8]"
        text="Tuition Jobs"
        monitorCount={tuitionJobs?.length}
        link="/myaccount/tuition-jobs"
      ></MonitoringCategoryDiv>

      <MonitoringCategoryDiv
        icon={<GiRoyalLove></GiRoyalLove>}
        iconBG="bg-[#d33737]"
        text="Enquiries"
        monitorCount={enquiriesData?.length}
        link="/myaccount/enquiries"
      ></MonitoringCategoryDiv>

      <MonitoringCategoryDiv
        icon={<FaArrowRight></FaArrowRight>}
        iconBG="bg-green-600"
        text="Watchlisted Jobs"
        monitorCount={324}
      ></MonitoringCategoryDiv>
      <MonitoringCategoryDiv
        icon={<FaEye></FaEye>}
        iconBG="bg-[#AE3EC9]"
        text="Watchlisted Jobs"
        monitorCount={324}
      ></MonitoringCategoryDiv>
      <MonitoringCategoryDiv
        icon={<FaUpload></FaUpload>}
        iconBG="bg-red-400"
        text="Watchlisted Jobs"
        monitorCount={324}
      ></MonitoringCategoryDiv>
      <MonitoringCategoryDiv
        icon={<BiNotepad></BiNotepad>}
        iconBG="bg-green-800"
        text="Watchlisted Jobs"
        monitorCount={324}
      ></MonitoringCategoryDiv>
      <MonitoringCategoryDiv
        icon={<FaStar></FaStar>}
        iconBG="bg-yellow-500"
        text="Review Received"
        monitorCount={totalReview?.length}
        link="/myaccount/reviewed-received"
      ></MonitoringCategoryDiv>
      <MonitoringCategoryDiv
        icon={<FiSend></FiSend>}
        iconBG="bg-orange-500"
        text="Watchlisted Jobs"
        monitorCount={324}
      ></MonitoringCategoryDiv>
    </div>
  );
};

export default MonitorSection;

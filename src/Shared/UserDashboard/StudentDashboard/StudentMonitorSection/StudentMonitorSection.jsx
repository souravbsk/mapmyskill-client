import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import useAuthChanged from "../../../../Hooks/useAuthChanged";
import axios from "axios";
const StudentMonitorSection = ({studentLevelData,unlockCount}) => {

  return (
    <div className="grid grid-cols-1  gap-[43px]">
      
        <MonitoringCategoryDiv
          icon={<FaRegHandPointer></FaRegHandPointer>}
          iconBG="bg-[#17A2B8]"
          text="Requirement"
          monitorCount={studentLevelData?.length}
          link={"/myaccount/requirement"}
        ></MonitoringCategoryDiv>
      

      <MonitoringCategoryDiv
        icon={<GiRoyalLove></GiRoyalLove>}
        iconBG="bg-[#d33737]"
        text="Contacts Unlocked"
        monitorCount={unlockCount}
        link={"/myaccount/unlockedcontact"}
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
    </div>
  );
};

export default StudentMonitorSection;

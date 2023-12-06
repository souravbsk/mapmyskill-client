import React, { useEffect, useState } from "react";
import { BsPhone } from "react-icons/bs";
import { FaEye, FaMapMarkerAlt } from "react-icons/fa";
import { GiSelfLove } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import img from "../../../../assets/images/teacher-icon.png";
import { Link, useNavigate } from "react-router-dom";
import StudentRequirementCard from "./StudentRequirementCard/StudentRequirementCard";
import axios from "axios";
import useAuthChanged from "../../../../Hooks/useAuthChanged";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function StudentRequirement() {
  const { user } = useAuthChanged();

  const [studentLevel, setStudentLevel] = useState([]);


  useEffect(() => {
    if (user) {
      axios
        .get(
          `http://localhost:8080/api/studentlevel/findallbyid/${user?.userid}`
        )
        .then((response) => {
          console.log("student level data", response.data.data);
          response?.data ? setStudentLevel(response?.data.data) : null;
        })
        .catch((error) => {
          console.error("Error fetching segments:", error);
        });
    }
  }, [user]);

  const navigate = useNavigate()
  const handleBack = () => {
    navigate('/myaccount/dashboard')
  }




  return (

    <div className="px-20 pb-10 pt-6">

      <div className='mb-2'>
        <button
          onClick={handleBack}
          className="bg-[#0ea5e9] text-white py-1 pl-2 pr-4">
          <ArrowBackIcon className="text-white"></ArrowBackIcon>
          Back
        </button>
      </div>

      <div className="py-5">
        <h1 className="text-2xl font-bold">My Open Requirements</h1>
        <p>{studentLevel.length} records found</p>
      </div>
      <StudentRequirementCard
        studentLevel={studentLevel && studentLevel}
      ></StudentRequirementCard>
    </div>
  );
}

export default StudentRequirement;

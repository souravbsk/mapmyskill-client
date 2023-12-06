import React, { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import TeacherViewCard from "../../../components/TeachersViewDetails/TeacherViewCard/TeacherViewCard";
import TeachersViewDetails from "../../../components/TeachersViewDetails/TeachersViewDetails";
import RelatedTeachers from "../../../components/TeachersViewDetails/RelatedTeachers/RelatedTeachers";
import MatchingTeacherFilter from "../../../components/TeachersViewDetails/MatchingTeacherFilter/MatchingTeacherFilter";
import AllTeacherViewCard from "./AllTeacherViewCard/AllTeacherViewCard";

const ViewAllTeachersDetails = () => {
  const [tutorsData, setTutorsData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  // Calculate age function
  const covertAge = (dob, address1) => {
    const dobdata = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dobdata.getFullYear();
    return age;
  };

  // Update address function
  const updateAddress = (address1) => {
    const [a, city, c] = address1.split(",");
    return city;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/findallbyrole/3`)
      .then((response) => {
        response.data.forEach((tutor) => {
          const tAge = covertAge(tutor.dob);
          tutor.dob = tAge;
        });
        response.data ? setTutorsData(response?.data) : null;
        response.data ? setFilterData(response?.data) : null;
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleFilterData = (data) => {
    setFilterData(data);
  };



  // console.log("filterData", filterData);

  return (
    <div className="px-24 py-10">
      <div className="mb-2">
        <Link to={"/myaccount/dashboard"}>
          <button className="bg-[#0ea5e9] text-white py-1 pl-2 pr-4">
            <ArrowBackIcon className="text-white"></ArrowBackIcon>
            Back
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-6 gap-4">
        <div className="grid col-span-1">
          
            <MatchingTeacherFilter
              tutorsData={tutorsData}
              handleFilterData={handleFilterData}
            ></MatchingTeacherFilter>
          
        </div>
        <div className="grid col-span-4 gap-4">
          <div>
            {filterData.map((data) => (
              <AllTeacherViewCard
                key={data.userid}
                userid={data.userid}
                tutorsData={data}
              ></AllTeacherViewCard>
            ))}
          </div>
        </div>
        <div className="grid col-span-1">
          {/* <RelatedTeachers></RelatedTeachers> */}
        </div>
      </div>
    </div>
  );
};

export default ViewAllTeachersDetails;

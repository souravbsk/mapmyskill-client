import React, { useContext } from "react";
import image from "../../assets/images/profile.png";
import TeacherViewCard from "./TeacherViewCard/TeacherViewCard";
import RelatedTeachers from "./RelatedTeachers/RelatedTeachers";
import TeacherDetails from "./TeacherDetails/TeacherDetails";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import MatchingTeacherFilter from "./MatchingTeacherFilter/MatchingTeacherFilter";
import useGetValue from "../../Hooks/useGetValue";

const TeachersViewDetails = () => {
  const [refetch, setRefetch] = useState(false);

  const [tutorsData, setTutorsData] = useState([]);
  const { id } = useParams();

  const { itemValue: languageValue } = useGetValue("language");
  const { itemValue: interestedInValue } = useGetValue("InterestedIn");

  // Calculate age function
  const covertAge = (dob, address1) => {
    const dobdata = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dobdata.getFullYear();
    return age;
  };

  useEffect(() => {
    if (id && languageValue && interestedInValue) {
      axios
        .get(
          `http://localhost:8080/api/users/find-teachers-by-userid/${id}?locationId=${interestedInValue}&languageId=${languageValue}`
        )
        .then((response) => {
          response.data.forEach((tutor) => {
            const tAge = covertAge(tutor.dob);
            tutor.dob = tAge;
          });
          response.data ? setTutorsData(response.data) : null;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id, refetch, languageValue, interestedInValue]);

  console.log(tutorsData);
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

      <div className="grid grid-cols-4 gap-4">
        <div className="grid col-span-3 gap-4">
          <div>
            <TeacherViewCard
              refetch={refetch}
              setRefetch={setRefetch}
              tutorsData={tutorsData}
            ></TeacherViewCard>

            <TeacherDetails id={id} tutorsData={tutorsData}></TeacherDetails>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersViewDetails;

import React, { useEffect, useState } from "react";
import TutorCard from "../TutorCard/TutorCard";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const TutorCardSection = ({ studentLevelSegmentId }) => {

  const [tutorsData, setTutorsData] = useState([]);
  const navigate = useNavigate();

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
      .get("http://localhost:8080/api/users/find-teachers-by-role/3")
      .then((response) => {
        response.data.forEach((tutor) => {
          const tAge = covertAge(tutor.dob);
          tutor.dob = tAge;
          const tCity = updateAddress(tutor.address1);
          tutor.address1 = tCity;
        });
        // const hasMatchingSegment = (student) => {
        //   return 
        // };
        const filteredUsers = response.data.filter((student) =>
          // hasMatchingSegment(student)
          {return student.segmentsid.some((id) =>
            studentLevelSegmentId.includes(id)
          );}
        );

        response.data ? setTutorsData(filteredUsers) : null;
      })
      .catch((error) => {
        console.error(error);
      });
  }, [studentLevelSegmentId]);

  const handleCardClick = (userid) => {
    navigate(`/myaccount/teachers/${userid}`);
  };


  console.log("tutorsData",tutorsData);


 

  return (
    <div className="grid sm:grid-cols-2 py-6 px-6 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {tutorsData.map((items, i) => (
        <div key={i} onClick={() => handleCardClick(items?.userid)}>
          <TutorCard allData={items}></TutorCard>
        </div>
      ))}
    </div>
  );
};

export default TutorCardSection;

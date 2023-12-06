import React from "react";
import img from "../../../../../assets/images/images.jpeg";
import {
  FaBook,
  FaMailBulk,
  FaMapMarked,
  FaMapMarkedAlt,
  FaPhone,
  FaUserGraduate,
} from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import useGetValue from "../../../../../Hooks/useGetValue"
import covertAge from "../../../../../Utils/CalculateAge";
import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
const TeacherProfileCard = ({id,subjects}) => {
  let allSubjects = subjects?.flat();
  const {itemValue:languageValue} = useGetValue("language")
  const {itemValue:interestedInValue} = useGetValue("InterestedIn")
  const [teacherDetails,setTeacherDetails] = useState()

  useEffect(() => {
    if(id && languageValue && interestedInValue){
      axios.get(`http://localhost:8080/api/users/find-teachers-by-userid/${id}?locationId=${interestedInValue}&languageId=${languageValue}`)
          .then((response) => {
              response.data.forEach(tutor => {
                  const tAge = covertAge(tutor.dob)
                  tutor.dob = tAge
              })
              if(response?.data.length > 0){
                setTeacherDetails(response?.data[0])
              }
          })
          .catch((error) => {
              console.error(error)
          })
     }
  
  },[id,languageValue,interestedInValue])

  console.log(teacherDetails);
  return (
    <div className="p-5 border mt-3 ">
      <div className="py-5 border-b">
        <figure className="flex items-center justify-center mb-5">
          <img className="h-44" src={`http://localhost:8080/${teacherDetails?.profileimagepath}`} alt="" />
        </figure>
        <div className="text-center">
         <div>
         <h2 className="text-base font-semibold text-[#1e293b]">
            {teacherDetails?.name} 
          </h2>
          <div className="flex items-center justify-center my-3">
         
          <Rating  style={{ maxWidth: 100 }} value={teacherDetails?.average_rating} readOnly></Rating>
          </div>
         </div>
          <span>{teacherDetails?.gender}, 71 Years</span>
          <div>
            <p>{teacherDetails?.experience} of teaching experience</p>
            <ul className="flex justify-center mt-3 items-center gap-3">
              <li >
                <FaMailBulk title={teacherDetails?.isEmailVarified.toLowerCase() == "y" ? "Email Verified" : "Email not verified"} ></FaMailBulk>
              </li>
              <li>
                <FaPhone title={teacherDetails?.isContactVarified.toLowerCase() == "y" ? "Phone Verified" : "Phone not verified"}></FaPhone>
              </li>
              <li>
                <FaMapMarked></FaMapMarked>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <ul>
          <li className="flex items-center gap-3">
            <FaUserGraduate /> B.Tech/B.E. (IIT Kharagpur - 1972)
          </li>
          <li className="flex items-center gap-3">
            <FaMapMarkedAlt /> {teacherDetails?.address1}
          </li>
          <li className="flex items-center gap-3">
            <FaBook /> {allSubjects?.length > 4 ? allSubjects.slice(0,4) + "..." : allSubjects}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TeacherProfileCard;

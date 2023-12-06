import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import UpdateTeacherPersonalInformation from "./UpdateTeacherPersonalInformation/UpdateTeacherPersonalInformation";
import ViewTeacherPersonalInformation from "./ViewTeacherPersonalInformation/ViewTeacherPersonalInformation";
import useAuthChanged from "../../../../Hooks/useAuthChanged";
import axios from "axios";

const TeacherPersonalInformation = () => {
  const [isEdit, setEdit] = useState(false);
  const [Refetch, setRefetch] = useState(true);
  const { user } = useAuthChanged();

  const [personalInfo, setPersonalInfo] = useState({});
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8080/api/personalinfo/byUserId/${user?.userid}`)
        .then((res) => {
          //   //console.log(res);
          setPersonalInfo(res?.data);
        });
    }
  }, [user, Refetch]);

  const backClickHandler = () => {
    setRefetch(!Refetch)
    setEdit(!isEdit)
  }

  return (
    <div className="shadow-lg bg-[#ACC8E5]">
      <div className="p-4 border-b-2 text-lg font-semibold bg-[#040936]  flex justify-between  ">
        <div className="p-1 hover:cursor-pointer hover:text-blue-500  ">
          {isEdit ? (
            <button onClick={backClickHandler} className="text-sm">
              {" "}
              Back
            </button>
          ) : (
            <p className="text-white text-xl">Personal Information</p>
          )}
        </div>
        {isEdit ? (
          <p>Edit Personal Information</p>
        ) : (
          <button onClick={() => setEdit(!isEdit)} className="text-sm text-white">
            <FaEdit size={22}></FaEdit>
          </button>
        )}
      </div>
      <div className="p-4 ">
        {isEdit ? (
          <UpdateTeacherPersonalInformation
            personalInfo={personalInfo}
            user={user}
            Refetch={Refetch}
            setRefetch={setRefetch}
          ></UpdateTeacherPersonalInformation>
        ) : (
          <ViewTeacherPersonalInformation
            personalInfo={personalInfo}
          ></ViewTeacherPersonalInformation>
        )}
      </div>
    </div>
  );
};

export default TeacherPersonalInformation;

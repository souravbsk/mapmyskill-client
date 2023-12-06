import React, { useEffect } from "react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import ViewTeacherQualification from "./ViewTeacherQualification/ViewTeacherQualification";
import useAuthChanged from "../../../../Hooks/useAuthChanged";
import axios from "axios";
import UpdateTeacherQualification from "./UpdateTeacherQualification/UpdateTeacherQualification";
const TeacherQualification = () => {
  const [isEdit, setEdit] = useState(false);
  const [Refetch, setRefetch] = useState(true);
  const { user } = useAuthChanged();
  const [schoolingQualificationData, setSchoolingQualificationData] = useState(
    {}
  );
  useEffect(() => {
    if (user) {
      fetch("/staticData.json")
        .then((res) => res.json())
        .then((data) => {
    
          const dataValue = data.find(
            (item) => item?.name.toLowerCase() == "language"
          );

          //console.log(dataValue, "language");
          axios

        .get(`http://localhost:8080/api/teacherschooling/${user?.userid}?languageId=${dataValue?.value}`)
        .then((res) => {
          if (res?.data) {
            setSchoolingQualificationData(res.data);
          }
        });
        });

      
    }
  }, [user, Refetch]);
  //console.log(schoolingQualificationData);
  return (
    <div className="bg-white shadow-lg">
      <div className="p-4 border-b-2 text-lg font-semibold  flex justify-between bg-[#040936] ">
        <div className="p-1 hover:cursor-pointer hover:text-blue-500 b">
          {isEdit ? (
            <button onClick={() => setEdit(!isEdit)} className="text-sm">
              {" "}
              Back
            </button>
          ) : (
            <p className="text-white text-2xl">Qualification</p>
          )}
        </div>
        {isEdit ? (
          <p>Edit Qualification</p>
        ) : (
          <button onClick={() => setEdit(!isEdit)} className="text-sm text-white">
            <FaEdit size={22}></FaEdit>
          </button>
        )}
      </div>
      <div className="p-4">
        {isEdit ? (
          <UpdateTeacherQualification
            Refetch={Refetch}
            setRefetch={setRefetch}
            schoolingQualificationData={schoolingQualificationData}
          ></UpdateTeacherQualification>
        ) : (
          <ViewTeacherQualification
            schoolingQualificationData={schoolingQualificationData}
          ></ViewTeacherQualification>
        )}
      </div>
    </div>
  );
};

export default TeacherQualification;

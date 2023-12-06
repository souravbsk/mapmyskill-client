import React, { useContext, useState } from "react";
import TeacherDetails from "../TeacherDetails/TeacherDetails";
import StudentContact from "../../../../components/StudentProfileForms/StudentContact/StudentContact";
import StudentDetails from "../StudentDetails/StudentDetails";

const ProfileDetailsForm = () => {
  const [roleId, setRoleId] = useState(
    JSON.parse(localStorage.getItem("roleId"))
  );

  return (
    <>
      <div>
        {roleId === 3 ? (
          <TeacherDetails />
        ) : roleId === 4 ? (
          <StudentDetails></StudentDetails>
        ) : null}
      </div>
    </>
  );
};

export default ProfileDetailsForm;

import React from "react";
import StudentDashboard from "./StudentDashboard/StudentDashboard";
import TeacherDashboard from "./TeacherDashboard/TeacherDashboard";
import useAuthChanged from "../../Hooks/useAuthChanged";


const UserDashboard = () => {
  const { user } = useAuthChanged();
  return (
    <div>

      {
        user && user?.roleid == 4 ? (<StudentDashboard></StudentDashboard>) : user?.roleid == 3 ?(<TeacherDashboard></TeacherDashboard>): null
      }

   
    </div>
  );
};

export default UserDashboard;

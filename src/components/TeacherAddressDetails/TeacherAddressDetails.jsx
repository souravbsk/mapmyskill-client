import React from "react";
import AddressDetails from "../AddressDetails/AddressDetails";

const TeacherAddressDetails = ({ teacherDetails }) => {
  console.log(teacherDetails);
  return (
    <div className="flex space-y-3 flex-col gap-2 p-6 bg-white border-b-2 mb-9">
      {teacherDetails &&
        teacherDetails?.map((item, i) => (
          <AddressDetails key={i} address={item}></AddressDetails>
        ))}
    </div>
  );
};

export default TeacherAddressDetails;

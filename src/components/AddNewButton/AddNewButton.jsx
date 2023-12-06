import React from "react";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
const AddNewButton = ({  handleBtnFunction, dynamicText }) => {
  return (
    <button className="bg-[#223F66] flex items-center gap-2 text-white px-4 py-2 rounded-lg shadow-lg" onClick={handleBtnFunction}>
      <AddCircleSharpIcon className="add_user_icon" />
      Add {dynamicText}
    </button>
  );
};

export default AddNewButton;

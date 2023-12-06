import React from "react";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
const DeleteAndEditButton = ({
  handleEditElement,
  handleDeleteElement,
  dynamicRowId,
}) => {
  return (
    <div className=" flex items-center gap-3">
      <button
        className="text-[#0000FF]"
        onClick={() => handleEditElement(dynamicRowId)}
      >
        <ModeIcon className="edit" />
      </button>
      <button
        className="text-red-500"
        onClick={() => handleDeleteElement(dynamicRowId)}
      >
        <DeleteIcon className="delete" />
      </button>
    </div>
  );
};

export default DeleteAndEditButton;

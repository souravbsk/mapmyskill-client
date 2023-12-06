import React, { useState } from "react";
import "./UploadButton.css";

const UploadButton = ({ btnText, handleImageUpload }) => {
  return (
    <div className="upload-btn-wrapper ">
      <button className="btn">{btnText ? btnText : "CHOOSE FILE"}</button>
      <input
        accept=".jpg, .jpeg, .png"
        onChange={handleImageUpload}
        type="file"
        name="myfile"
      />
    </div>
  );
};

export default UploadButton;

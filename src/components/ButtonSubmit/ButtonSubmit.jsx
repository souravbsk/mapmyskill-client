import React from "react";

const ButtonSubmit = ({ alignValue,btnText }) => {
  return (
    <div className={`text-${alignValue}`}>
      <button type="submit" className="px-4 py-2 bg-[#1565C0] rounded-md text-white uppercase text-sm font-medium">
        
        {
          btnText ? btnText : "Save and Continue"
        }
      </button>
    </div>
  );
};

export default ButtonSubmit;

import React from "react";
import { Link } from "react-router-dom";

const SignUpRoleCard = ({
  image,
  title,
  para,
  buttonText,
  sideBorder,
  roleId,
  handleRoleForm
}) => {
  return (
    <div className={`${sideBorder && "border-r-2"} py-10 px-5`}>
      <img className="w-[100px] h-[100px] mx-auto" src={image} />
      <div className="text-center space-y-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p>{para}</p>
        <div>
          
            <button onClick={() => handleRoleForm(roleId)} className="bg-[rgb(14,165,233)] text-white py-3 px-6">
              {buttonText}
            </button>
          
        </div>
      </div>
    </div>
  );
};

export default SignUpRoleCard;

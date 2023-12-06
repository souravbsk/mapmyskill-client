import React from "react";

const HowItWorksCard = ({ image, title, para,sideborder ,animation}) => {
  return (
    <div className={`${sideborder && "border-r-2" } py-10 px-5`} data-aos={animation}  data-aos-duration="1000">
      <img className="w-[100px] h-[100px] mx-auto" src={image} />
      <div className="text-center space-y-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p>{para}</p>
      </div>
    </div>
  );
};

export default HowItWorksCard;

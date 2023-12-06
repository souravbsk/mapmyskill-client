import React, { useState } from "react";
import SchoolingBackgroundBlock from "../../../../../../components/SchoolingBackgroundBlock/SchoolingBackgroundBlock";
import useAuthChanged from "../../../../../../Hooks/useAuthChanged";
import axios from "axios";
import { useEffect } from "react";

const SchoolingBackground = ({ schoolingQualificationData }) => {
  return (
    <div className="border  rounded-md shadow-lg ">
      <div className="bg-[#ACC8E5] pt-3 pl-3">
      <h1 className="text-lg font-semibold ">Schooling Background</h1>

      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 p-3 bg-[#ACC8E5]">
      {schoolingQualificationData &&
        schoolingQualificationData?.schoolingData?.map((schoolingBg, i) => (
          <div>
          <SchoolingBackgroundBlock
          key={i}
          schoolingBg={schoolingBg}
        ></SchoolingBackgroundBlock>
          </div>
       
        ))}
      </div>

    </div>
  );
};

export default SchoolingBackground;

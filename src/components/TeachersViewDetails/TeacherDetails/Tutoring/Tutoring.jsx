import React from "react";
import { useState } from "react";

const Tutoring = ({ tutorsData }) => {
  console.log("tutorsData", tutorsData);

  const languages = tutorsData[0]?.language
    ? Object.values(tutorsData[0]?.language).flat()
    : null;

  const locations = tutorsData[0]?.location
    ? Object.values(tutorsData[0]?.location).flat()
    : null;

  return (
    <div className="border-2">
      <div className="border-b-2 py-3 pl-2">
        <h2 className="text-2xl font-bold">Educational Qualifications</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 py-3 pl-2">
        <div className="font-bold text-md">
          <p>Qualification </p>
        </div>
        <p className="col-span-5">{tutorsData[0]?.specializations}</p>

        <div className="font-bold text-md">
          <p>Experience</p>
        </div>
        <div className="col-span-5">
          <p>{tutorsData[0]?.experience}</p>
        </div>

        <div className="font-bold text-md">
          <p>Tutoring Options</p>
        </div>
        <div className="col-span-5">
          {locations?.map((items, i) => (
            <span key={i}>{items}, </span>
          ))}
        </div>

        <div className="font-bold text-md">
          <p>Approach</p>
        </div>
        <div className="col-span-5">
          <div
            dangerouslySetInnerHTML={{
              __html: tutorsData[0]?.trainingapproach,
            }}
          ></div>
        </div>

        <div className="font-bold text-md">
          <p>Vehicles Owned</p>
        </div>
        <div className="col-span-5">
          <p>{` ${tutorsData[0]?.vehiclesOwned}`}</p>
        </div>

        <div className="font-bold text-md">
          <p>Medium of Instruction</p>
        </div>
        <div className="col-span-5">
          {languages?.map((items, i) => (
            <span key={i}>{items}, </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tutoring;

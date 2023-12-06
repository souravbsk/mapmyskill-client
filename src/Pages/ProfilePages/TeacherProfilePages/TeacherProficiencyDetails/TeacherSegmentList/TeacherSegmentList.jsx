import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import TeacherSubjectBlock from "./TeacherSubjectBlock/TeacherSubjectBlock";
import useAuthChanged from "../../../../../Hooks/useAuthChanged";

const TeacherSegmentList = ({ segments }) => {
  const { user } = useAuthChanged();
  //console.log(segments,"segmentdata");

  return (
    <div>
      {segments &&
        segments?.map((segmentdata, i) => (
          <TeacherSubjectBlock
            segmentdata={segmentdata}
            key={i}
          ></TeacherSubjectBlock>
        ))}
    </div>
  );
};

export default TeacherSegmentList;

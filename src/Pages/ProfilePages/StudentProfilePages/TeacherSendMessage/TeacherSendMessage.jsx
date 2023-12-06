import React, { useEffect, useState } from "react";
import TeacherProfileCard from "./SendMessage/TeacherProfileCard";
import SendMessage from "./SendMessage/SendMessage";
import useAuthChanged from "../../../../Hooks/useAuthChanged";
import axios from "axios";
import { useParams } from "react-router-dom";

const TeacherSendMessage = () => {
  const { id } = useParams();
  const { user } = useAuthChanged();

  const [segmentData, setSegmentData] = useState([]);
  const [subjects, setSubjects] = useState([]);


  useEffect(() => {
    if (user?.userid && id) {
      axios
        .get(`http://localhost:8080/api/teachertraininglevel/${id}`)
        .then((res) => {
          if (res?.data?.success) {
            const segmentData = res?.data?.data;
            axios
              .get(`http://localhost:8080/api/teachersubject/${id}`)
              .then((subRes) => {
                const teacherSubject = Object.values(subRes?.data);
                const subjectValue = teacherSubject.map((items) =>
                  items.map((sub) => sub.subject_name)
                );

                setSubjects(...subjects, subjectValue);
                const subjectData = subRes?.data;
                const segmentBlock = segmentData.map((segment) => {
                  const boardid = segment?.boardData.map(
                    (board) => board?.listItemId
                  );
                  for (const subject in subjectData) {
                    const subjectID = subjectData[subject].map(
                      (sub) => sub?.subject_id
                    );
                    if (subject == segment?.segment) {
                      segment["subjectData"] = subjectData[subject];
                      segment["subjects"] = subjectID;
                      segment["boards"] = boardid;
                      return segment;
                    }
                  }
                });

                if (segmentBlock) {
                    console.log(segmentBlock);
                  setSegmentData(segmentBlock);
                }
              });
          }
        });
    }
  }, [user, id]);

  return (
    <div className="containerCl ">
      <h2 className="text-xl  mt-8 font-semibold text-#1e293b]">
        Send Message to Samir Chatterjee
      </h2>
      <div className="flex justify-center gap-6 mt-6">
        <TeacherProfileCard subjects={subjects} id={id}></TeacherProfileCard>
        <SendMessage segmentData={segmentData} id={id}></SendMessage>
      </div>
    </div>
  );
};

export default TeacherSendMessage;

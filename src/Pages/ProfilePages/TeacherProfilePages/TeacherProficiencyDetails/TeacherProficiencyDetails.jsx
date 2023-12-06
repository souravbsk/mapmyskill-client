import React, { useEffect, useState } from "react";
import TeacherProficiencyDetailsBlocks from "./TeacherProficiencyDetailsBlocks/TeacherProficiencyDetailsBlocks";
import TeachingLocationDetails from "./TeachingLocationDetails/TeachingLocationDetails";
import TeachingInstitution from "./TeachingInstitution/TeachingInstitution";
import useAuthChanged from "../../../../Hooks/useAuthChanged";
import axios from "axios";
import { Button } from "@mui/material";
import AddMoreTutoringModal from "../../../../components/AddMoreTutoringModal/AddMoreTutoringModal";
import TeacherSegmentList from "./TeacherSegmentList/TeacherSegmentList";
import { FaEdit } from "react-icons/fa";
import UpdateTeacherProf from "./UpdateTeacherProf/UpdateTeacherProf";

const TeacherProficiencyDetails = () => {
  const { user } = useAuthChanged();
  const [isEdit, setEdit] = useState(false);
  const [segments, setSegment] = useState([]);
  // const [reFetch,setRefetch]

  const [ProficiencyDetails, setProficiencyDetails] = useState({});
  useEffect(() => {
    if (user?.userid) {
      fetch("/staticData.json")
        .then((res) => res.json())
        .then((data) => {
          const dataValue = data.find(
            (item) => item?.name.toLowerCase() == "teacherlocation"
          );
          axios
            .get(
              `http://localhost:8080/api/teacherproficiency/${user?.userid}?locationId=${dataValue?.value}`
            )
            .then((res) => {
              if (res?.data) {
                setProficiencyDetails(res?.data);
              }
            });
        });
    }
  }, [user,isEdit]);

  useEffect(() => {
    if (user?.userid) {
      axios
        .get(`http://localhost:8080/api/teachertraininglevel/${user?.userid}`)
        .then((res) => {
          if (res?.data?.success) {
            const segmentData = res?.data?.data;
            axios
              .get(`http://localhost:8080/api/teachersubject/${user?.userid}`)
              .then((subRes) => {
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
                  setSegment(segmentBlock);
                }
              });
          }
        });
    }
  }, [user,isEdit]);

  console.log(segments);

  return (
    <div>
      <div className="mb-8">
        <div className=" p-5 bg-[#040936]">
          <div className="  text-lg font-semibold  flex justify-between  ">
            <div className="p-1 hover:cursor-pointer hover:text-blue-500">
              {isEdit ? (
                <button onClick={() => setEdit(!isEdit)} className="text-sm">
                  {" "}
                  Back
                </button>
              ) : (
                <p className="text-xl text-white">Teacher Proficiency</p>
              )}
            </div>
            {isEdit ? (
              <p className="text-xl text-white">Teacher Proficiency</p>
            ) : (
              <button onClick={() => setEdit(!isEdit)} className="text-sm text-white">
                <FaEdit size={22}></FaEdit>
              </button>
            )}
          </div>
        </div>
      </div>

      {isEdit ? (
        <UpdateTeacherProf
          isEdit={isEdit}
          setEdit={setEdit}
          segmentsData={segments}
          ProficiencyDetails={ProficiencyDetails}
        ></UpdateTeacherProf>
      ) : (
        <div>
          <div className="mb-8 bg-white">
            <div className="p-4 bg-[#ACC8E5]">
              <h2 className="text-xl font-semibold">Teacher Training Level</h2>
            </div>
            <div className=" px-4 pb-4">
              <TeacherSegmentList
                segments={segments}
                user={user}
              ></TeacherSegmentList>
            </div>
          </div>
          <div className="mb-8">
            <div className="p-4 bg-[#ACC8E5]">
              <h2 className="text-xl font-semibold">
                Teacher Teaching Location
              </h2>
            </div>

            <div className="bg-white">
              <TeachingLocationDetails
                teachingLocation={
                  ProficiencyDetails?.location?.teachingLocation
                }
              ></TeachingLocationDetails>
            </div>
          </div>
          <div className="p-4 bg-[#ACC8E5]">
            <h2 className="text-xl font-semibold">Teacher Other Information</h2>
          </div>
          <div className="border-blue-400 bg-white">
            <TeacherProficiencyDetailsBlocks
              ProficiencyDetails={ProficiencyDetails?.teacherInfo}
            ></TeacherProficiencyDetailsBlocks>
          </div>

          { ProficiencyDetails?.teacherInfo?.hasteachingexp?.toLowerCase() == "y" && <div className="mt-8">
            <div className="p-4 bg-[#ACC8E5]">
              <h2 className="text-xl font-semibold"> Experience teaching</h2>
            </div>
            <div className="bg-white">
              <TeachingInstitution
                ProficiencyDetails={ProficiencyDetails?.teacherInfo}
              ></TeachingInstitution>
            </div>
          </div>}
        </div>
      )}
    </div>
  );
};

export default TeacherProficiencyDetails;
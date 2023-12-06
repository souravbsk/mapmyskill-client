import React, { memo } from "react";
import UpdateTeacherSubject from "./UpdateTeacherSubject/UpdateTeacherSubject";
import { useState } from "react";
import useAuthChanged from "../../../../../Hooks/useAuthChanged";
import UpdateTeachingLocation from "./UpdateTeachingLocation/UpdateTeachingLocation";
import UpdateTeacherExp from "./UpdateTeacherExp/UpdateTeacherExp";
import LoadingProgress from "../../../../../components/LoadingProgress/LoadingProgress";
import axios from "axios";
import Swal from "sweetalert2";
import useFetchValue from "../../../../../Hooks/useFetchValue";

const UpdateTeacherProf = ({ segmentsData,setEdit, isEdit, ProficiencyDetails }) => {
  const { user } = useAuthChanged();
  const [isLoading, setisLoading] = useState(false);
  const [blocks, setBlocks] = useState(segmentsData || []);
  const { getValue: teacherLocationData } = useFetchValue("teacherlocation");
  const listid = teacherLocationData[0]?.listid;
  const [TeacherLocation, setTeacherLocation] = useState(
    ProficiencyDetails?.location?.locationDefaultData || []
  );
  const [ApproachText, setApproachText] = useState(
    ProficiencyDetails?.teacherInfo?.trainingapproach || ""
  );
  const [universityNameValue, setUniversityNameValue] = useState(
    ProficiencyDetails?.teacherInfo?.universitynameId || ""
  );

  const handleSubmitTeachingLevel = (e) => {
    e.preventDefault();
    const form = e.target;
    const teachingLocation = TeacherLocation;
    const hasteachingexp = form.exp.value || null;
    const universityname = universityNameValue || null;
    const location = form?.location?.value || null;
    const serviceperiod = form?.serviceperiod?.value || null;
    const trainingapproach = ApproachText || null;
    const expinyear = form?.totalExp?.value || null;

    if (user) {
      fetch("/staticData.json")
        .then((res) => res.json())
        .then((data) => {
          const dataValue = data.find(
            (item) => item?.name.toLowerCase() == "teacherlocation"
          );
          axios
            .delete(
              `http://localhost:8080/api/teachertraininglevel/delete/${user?.userid}/${dataValue?.value}`
            )
            .then((res) => {
              if (res.data.success) {
                axios
                  .post(
                    "http://localhost:8080/api/teachertraininglevel",
                    blocks
                  )
                  .then((boardres) => {
                    if (boardres.data.success) {
                      console.log(blocks);
                      axios
                        .post(
                          "http://localhost:8080/api/teachersubject",
                          blocks
                        )
                        .then((subjectRes) => {
                          if (subjectRes.data.success) {
                            const teachingLocationPayload = {
                              userid: user?.userid,
                              listitemid: teachingLocation,
                              listid,
                            };
                            axios
                              .post(
                                "http://localhost:8080/api/systemlistdata",
                                teachingLocationPayload
                              )
                              .then((teachingLocationres) => {
                                if (teachingLocationres.data) {
                                  //teacher proficiency data insert start
                                  const proficiencyPayload = {
                                    userid: user?.userid,
                                    hasteachingexp,
                                    universityname,
                                    location,
                                    serviceperiod,
                                    trainingapproach,
                                    expinyear,
                                  };
                                  axios
                                    .post(
                                      "http://localhost:8080/api/teacherproficiency",
                                      proficiencyPayload
                                    )
                                    .then((proficiencyres) => {
                                      if (proficiencyres.data) {
                                        Swal.fire({
                                          position: "center",
                                          icon: "success",
                                          title: "Teacher Proficiency  Updated",
                                          showConfirmButton: false,
                                          timer: 1500,
                                        });
                                        setEdit(false)
                                      }
                                    });
                                  //teacher proficiency data insert end
                                }
                              });
                          }
                        });
                    }
                  });
              }
            });
        });
    }

    // console.log(
    //   teachingLocation,
    //   hasteachingexp,
    //   universityname,
    //   location,
    //   serviceperiod,
    //   trainingapproach,
    //   expinyear
    // );
    console.log(blocks);
  };

  return (
    <div>
      <form onSubmit={handleSubmitTeachingLevel}>
        <UpdateTeacherSubject
          setisLoading={setisLoading}
          blocks={blocks}
          isEdit={isEdit}
          setBlocks={setBlocks}
          segmentsData={segmentsData}
        ></UpdateTeacherSubject>
        <UpdateTeachingLocation
          teacherLocationData={teacherLocationData}
          setTeachingLocation={setTeacherLocation}
          teachingLocation={ProficiencyDetails?.location}
        ></UpdateTeachingLocation>
        <UpdateTeacherExp
          setUniversityNameValue={setUniversityNameValue}
          setApproachText={setApproachText}
          ApproachText={ApproachText}
          ProficiencyDetails={ProficiencyDetails}
        ></UpdateTeacherExp>

        <button className="px-4 mt-4 py-2 bg-[#1565C0] rounded-md text-white uppercase text-sm font-medium">
          Save and Continue
        </button>
      </form>
      <LoadingProgress isLoading={isLoading}></LoadingProgress>
    </div>
  );
};

export default memo(UpdateTeacherProf);

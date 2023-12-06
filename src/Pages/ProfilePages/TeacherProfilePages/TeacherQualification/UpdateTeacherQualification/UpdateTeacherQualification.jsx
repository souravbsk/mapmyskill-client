import React from "react";
import UpdateClassQualification from "./UpdateClassQualification/UpdateClassQualification";
import { useState } from "react";
import axios from "axios";
import UpdateHigherQualification from "./UpdateHigherQualification/UpdateHigherQualification";
import Swal from "sweetalert2";
import UpdateTeacherLanguage from "./UpdateTeacherLanguage/UpdateTeacherLanguage";
import useAuthChanged from "../../../../../Hooks/useAuthChanged";

const UpdateTeacherQualification = ({
  setRefetch,
  Refetch,
  schoolingQualificationData,
}) => {
  const { user } = useAuthChanged();
  const [updateClasses, setUpdateClasses] = useState(
    schoolingQualificationData?.schoolingData || []
  );
  //console.log(schoolingQualificationData);
  const [blocks, setBlocks] = useState(
    schoolingQualificationData?.educationData || []
  );
  const [defaultLang, setdefaultLang] = useState(
    schoolingQualificationData?.languageData || []
  );
  const [TeachingLanguage, setTeachingLanguage] = useState([]);

  const handleSubmitQualification = (e) => {
    e.preventDefault();

    // qulification data update
    axios
      .put(`http://localhost:8080/api/teacherschooling`, updateClasses)
      .then((res) => {
        //console.log(res);
        if (res?.data?.success) {
          axios
            .post(
              "http://localhost:8080/api/teachereducation/updateTeacherEducation",
              blocks
            )
            .then((res) => {
              //console.log(res);

              if (res?.data?.results) {
                //console.log(res, "data qulificationb");

                if (TeachingLanguage.length > 0) {
                  //fetch language value from static json
                  fetch("/staticData.json")
                    .then((res) => res.json())
                    .then((data) => {
                      const langValue = data.find(
                        (item) => item?.name.toLowerCase() == "language"
                      );
                      const listItemIds = TeachingLanguage.map(
                        (item) => item?.listItemId || item?.listitemid
                      );

                      const payloadLang = {
                        userid: user?.userid,
                        listitemid: listItemIds,
                        listid: langValue?.value,
                      };
                      axios
                        .delete(
                          `http://localhost:8080/api/systemlistdata/lang-update/${user?.userid}/${langValue?.value}`
                        )
                        .then((deleteRes) => {
                          if (deleteRes?.data.success) {
                            axios
                              .post(
                                `http://localhost:8080/api/systemlistdata`,
                                payloadLang
                              )
                              .then((insertres) => {
                                if (insertres.data) {
                                  Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "Your qualification data updated",
                                    showConfirmButton: false,
                                    timer: 1500,
                                  });
                                  setRefetch(!Refetch);
                                }
                              });
                          }
                        });
                    });
                }
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Your qualification data updated",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setRefetch(!Refetch);
              }
            });
        }
      });
  };

  return (
    <div>
      <div id="outer-box">
        <form
          onSubmit={handleSubmitQualification}
          className="box mx-auto max-w-full  w-full"
        >
          <UpdateClassQualification
            schoolingData={updateClasses}
            setUpdateClasses={setUpdateClasses}
          ></UpdateClassQualification>
          <UpdateHigherQualification
            Refetch={Refetch}
            setRefetch={setRefetch}
            setBlocks={setBlocks}
            blocks={blocks}
          ></UpdateHigherQualification>
          <UpdateTeacherLanguage
            defaultLang={defaultLang}
            setdefaultLang={setdefaultLang}
            TeachingLanguage={TeachingLanguage}
            setTeachingLanguage={setTeachingLanguage}
          ></UpdateTeacherLanguage>
          <div className="text-left mt-6">
            <button className="px-4 py-2 bg-[#1565C0] rounded-md text-white uppercase text-sm font-medium">
              Save and Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTeacherQualification;

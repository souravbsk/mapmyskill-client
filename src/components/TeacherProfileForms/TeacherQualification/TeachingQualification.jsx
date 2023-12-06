import React, { useContext, useEffect, useState } from "react";
import "./TeachingQualification.css";
import { TextField, Button, FormControl } from "@mui/material";
import ClassQualification from "./ClassQualification/ClassQualification";
import HighestQualification from "./HighestQualification/HighestQualification";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import BackButton from "../../BackButton/BackButton";
import NextButton from "../../NextButton/NextButton";
import useFetchValue from "../../../Hooks/useFetchValue";
import { StepperProvider } from "../../../Providers/ShowSteperProvider";
import Swal from "sweetalert2";

const TeachingQualification = () => {
  const [user, setUser] = useState({});
  const { step, setStep } = useContext(StepperProvider);

  useEffect(() => {
    const getUser = localStorage.getItem("user_Info");
    if (getUser) {
      const parseUser = JSON.parse(getUser);
      setUser(parseUser);
    }
  }, []);

  const { getValue: languageData } = useFetchValue("language");

  const listId = languageData[0]?.listid;

  const [TeachingLanguage, setTeachingLanguage] = useState([]);

  const [blocks, setBlocks] = useState([
    {
      level: "",
      specialization: "",
      InstitutionName: "",
      InstitutionAddress: "",
      university: "",
      mediumofInstruction: "",
      coursetype: "",
      userid: "",
    },
  ]);

  const handleSubmitQualification = (e) => {
    e.preventDefault();
    const form = e.target;
    const tenthBoard = form.tenthBoard.value;
    const tenthpassingYear = form.tenthpassingYear.value;
    const tenthSchoolName = form.tenthSchoolName.value;
    const tenthSchoolLocation = form.tenthSchoolLocation.value;
    const twelvthBoard = form.twelvthBoard.value;
    const twelvthpassingYear = form.twelvthpassingYear.value;
    const twelvthSchoolName = form.twelvthSchoolName.value;
    const twelvthSchoolLocation = form.twelvthSchoolLocation.value;

    const schoolingBackgroud = [
      {
        userId: user?.userID,
        level: "M",
        board: tenthBoard,
        schoolName: tenthSchoolName,
        schoolAddress: tenthSchoolLocation,
        passingYear: tenthpassingYear,
      },
      {
        userId: user?.userID,
        level: "I",
        board: twelvthBoard,
        schoolName: twelvthSchoolName,
        schoolAddress: twelvthSchoolLocation,
        passingYear: twelvthpassingYear,
      },
    ];

    //console.log("blocks", blocks);

    if (user) {
      axios
        .post("http://localhost:8080/api/teacherschooling", schoolingBackgroud)
        .then((res) => {
          if (res.data.success) {
            if (user) {
              axios
                .post("http://localhost:8080/api/teachereducation", blocks)
                .then((res) => {
                  if (res.data) {
                    const payloadLang = {
                      userid: user?.userID,
                      listitemid: TeachingLanguage,
                      listid: listId,
                    };
                    axios
                      .post(
                        "http://localhost:8080/api/systemlistdata",
                        payloadLang
                      )
                      .then((res) => {
                        if (res.data) {
                          Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Teacher Qualification saved",
                            showConfirmButton: false,
                            timer: 1500,
                          });
                          setStep(4);
                          localStorage.setItem("stepper", JSON.stringify(4));
                        }
                      });
                  }
                });
            }
          }
        });
    }
  };

  return (
    <div id="outer-box">
      {/* <div className="w-full flex justify-between">
        <BackButton></BackButton>
        <NextButton></NextButton>
      </div> */}
      <form
        onSubmit={handleSubmitQualification}
        className="box mx-auto max-w-full md:w-8/12 w-full"
      >
        <ClassQualification></ClassQualification>
        <HighestQualification
          setBlocks={setBlocks}
          blocks={blocks}
          user={user}
        ></HighestQualification>
        <div className="input-container mt-8">
          <div className="input-holder">
            <FormControl fullWidth>
              <Multiselect
                displayValue={"listItemName"}
                isObject={true}
                onSelect={(teacherLanguage) =>
                  setTeachingLanguage(
                    teacherLanguage.map((item) => item?.listItemId)
                  )
                }
                onRemove={(teacherLanguage) =>
                  setTeachingLanguage(
                    teacherLanguage.map((item) => item?.listItemId)
                  )
                }
                options={languageData}
                placeholder="Select Languages Known"
                showArrow={true}
              />
            </FormControl>
          </div>
        </div>
        <div className="text-left mt-6">
          <button className="px-4 py-2 bg-[#1565C0] rounded-md text-white uppercase text-sm font-medium">
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeachingQualification;

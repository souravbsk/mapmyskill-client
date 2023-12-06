import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  Button,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import "./TeachingExperienc.css";
import MultiSelectCheckBox from "../../MultiSelectCheckBox/MultiSelectCheckBox";
import AddMoreTutoring from "./AddMoreTutoring/AddMoreTutoring";
import useFetchValue from "../../../Hooks/useFetchValue";
import TeachingLocation from "./TeachingLocation/TeachingLocation";
import TeacherTeachingExperiance from "./TeacherTeachingExperiance/TeacherTeachingExperiance";
import BackButton from "../../BackButton/BackButton";
import NextButton from "../../NextButton/NextButton";
import Swal from "sweetalert2";
import { StepperProvider } from "../../../Providers/ShowSteperProvider";
import { json } from "react-router-dom";
const TeachingExperience = () => {
  const [user, setUser] = useState({});
  const { step, setStep } = useContext(StepperProvider);

  useEffect(() => {
    const getUser = localStorage.getItem("user_Info");
    if (getUser) {
      const parseUser = JSON.parse(getUser);
      setUser(parseUser);
    }
  }, []);

  const [blocks, setBlocks] = useState([
    {
      category: "",
      segment: "",
      subjects: [],
      boards: [],
      price: "",
      userid: user?.userID,
    },
  ]);

  const { getValue: teacherLocationData } = useFetchValue("teacherlocation");
  const [TeacherLocation, setTeacherLocation] = useState([]);
  const listid = teacherLocationData[0]?.listid;
  const [ApproachText, setApproachText] = useState("");
  console.log("object", TeacherLocation);

  //teacher university name value in init

  const [universityNameValue, setUniversityNameValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const teachingBlocks = blocks;
    const teachingLocation = TeacherLocation;
    const hasteachingexp = form.exp.value || null;
    const universityname = universityNameValue || null;
    const location = form?.location?.value || null;
    const serviceperiod = form?.serviceperiod?.value || null;
    const trainingapproach = ApproachText || null;
    const expinyear = form?.totalExp?.value || null;

    console.log(blocks);
    console.log("university location", location);

    if (user) {
      axios
        .post("http://localhost:8080/api/teachertraininglevel", blocks)
        .then((boardres) => {
          if (boardres.data.success) {
            console.log(blocks);
            axios
              .post("http://localhost:8080/api/teachersubject", blocks)
              .then((subjectRes) => {
                if (subjectRes.data.success) {
                  const teachingLocationPayload = {
                    userid: user?.userID,
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
                          userid: user?.userID,
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
                                title: "Teacher Proficiency  saved",
                                showConfirmButton: false,
                                timer: 1500,
                              });
                              setStep(3);
                              localStorage.setItem(
                                "stepper",
                                JSON.stringify(3)
                              );
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
  };

  return (
    <div>
      <form
        className="md:w-7/12 w-full mx-auto shadow-lg p-1"
        onSubmit={handleSubmit}
      >
        <AddMoreTutoring
          blocks={blocks}
          setBlocks={setBlocks}
          user={user}
        ></AddMoreTutoring>

        <CardContent>
          <TeachingLocation
            teacherLocationData={teacherLocationData}
            setTeachingLocation={setTeacherLocation}
          ></TeachingLocation>
          <TeacherTeachingExperiance
            setUniversityNameValue={setUniversityNameValue}
            setApproachText={setApproachText}
            ApproachText={ApproachText}
          ></TeacherTeachingExperiance>
        </CardContent>

        <button className="px-4 py-2 bg-[#1565C0] rounded-md text-white uppercase text-sm font-medium">
          Save and Continue
        </button>
      </form>
    </div>
  );
};

export default TeachingExperience;

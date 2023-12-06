import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import useFetchValue from "../../../../../../Hooks/useFetchValue";
import ReactSearchcomplete from "../../../../../../components/ReactSearchcomplete/ReactSearchcomplete";
import LocationByPincode from "../../../../../../components/LocationByPincode/LocationByPincode";
import useAuthChanged from "../../../../../../Hooks/useAuthChanged";
import axios from "axios";

const UpdateHigherQualification = ({
  Refetch,
  setRefetch,
  setBlocks,
  blocks,
}) => {
  console.log("blocks", blocks);
  const { user } = useAuthChanged();
  const { getValue: teacherEducationLevel } = useFetchValue(
    "teacherEducationLevel"
  );
  const { getValue: teacherCourseType } = useFetchValue("courseType");
  const { getValue: instructionMedium } = useFetchValue("language");
  const { getValue: universityName } = useFetchValue("teacherUniversityName");
  const { getValue: instituteName } = useFetchValue("teacherInstituteName");
  const { getValue: teacherSpecialization } = useFetchValue(
    "teacherSpecialization"
  );
  console.log(blocks, "hello block");
  console.log(user?.userid);
  const handleAddBlock = () => {
    setBlocks([
      ...blocks,
      {
        level: "",
        specialization: "",
        InstitutionName: "",
        InstitutionAddress: "",
        university: "",
        mediumofInstruction: "",
        coursetype: "",
        userid: user?.userid,
        dbstatus: "i",
      },
    ]);
  };
  // QualificationLevel
  const handleQualificationLevelChange = (index, value, educationid) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].level = value;
    updatedBlocks[index].userid = user?.userid;
    if (educationid) {
      updatedBlocks[index].dbstatus = "u";
    }
    setBlocks(updatedBlocks);
  };

  //Specialization
  const handleSpecialization = (index, value, educationid) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].specialization = value;
    if (educationid) {
      updatedBlocks[index].dbstatus = "u";
    }
    setBlocks(updatedBlocks);
  };

  //InstituteName
  const handleInstituteName = (index, value, educationid) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].InstitutionName = value.id;
    if (educationid) {
      updatedBlocks[index].dbstatus = "u";
    }
    setBlocks(updatedBlocks);
  };
  //InstituteLocation

  //universityName
  const handleUniversityName = (index, value, educationid) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].university = value.id;
    if (educationid) {
      updatedBlocks[index].dbstatus = "u";
    }
    setBlocks(updatedBlocks);
  };

  const handleMediumOfInstruction = (index, item, educationid) => {
    console.log(index);
    const updatedBlocks = [...blocks];
    updatedBlocks[index].mediumofInstruction = item.id;
    if (educationid) {
      updatedBlocks[index].dbstatus = "u";
    }
    setBlocks(updatedBlocks);
  };

  //CourseType
  const handleCourseType = (index, value, educationid) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].coursetype = value;
    if (educationid) {
      updatedBlocks[index].dbstatus = "u";
    }
    setBlocks(updatedBlocks);
  };

  const instituteLocationHandler = (value, index, educationid) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].InstitutionAddress = value.Pincode;
    if (educationid) {
      updatedBlocks[index].dbstatus = "u";
    }
    setBlocks(updatedBlocks);
  };

  const handleDeleteBlock = (index, educationId) => {
    if (educationId) {
      // axios
      //   .delete(`http://localhost:8080/api/teachereducation/${educationId}`)
      //   .then((res) => {
      //     if (res?.data) {
      //       const updatedBlocks = [...blocks];
      //       updatedBlocks.splice(index, 1);
      //       setBlocks(updatedBlocks);
      //       setRefetch(!Refetch);
      //     }
      //   });

      const updatedBlocks = [...blocks];
      updatedBlocks[index].dbstatus = "d";
      setBlocks(updatedBlocks);
    }

    // const updatedBlocks = [...blocks];
    // updatedBlocks.splice(index, 1);
    // setBlocks(updatedBlocks);

    // const updatedBlocks = [...blocks];
    // if (educationId) {
    //   // If an education has an ID, update its dbstatus to 'delete' and remove it from the UI
    //   updatedBlocks[index].dbstatus = "delete";
    // }
    // // Remove the block from the UI
    // updatedBlocks.splice(index, 1);
    // setBlocks(updatedBlocks);
    // setRefetch(!Refetch);
  };

  return (
    <div>
      <h2 className="education text-center text-lg md:text-xl mb-8 font-semibold">
        ____Highest Qualification___
      </h2>

      {blocks.map((block, index) => (
        <div className={`mb-8 ${block?.dbstatus == "d" && "hidden"}`}>
          <div className="flex items-center mb-3 flex-col md:flex-row gap-3">
            <div className="input-container">
              <div className="input-holder">
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">
                    Qualification Level
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Qualification Level"
                    required
                    value={block.level}
                    onChange={(e) =>
                      handleQualificationLevelChange(
                        index,
                        e.target.value,
                        block?.educationid
                      )
                    }
                  >
                    {teacherEducationLevel.map((qualificationLevel) => (
                      <MenuItem
                        key={qualificationLevel.listItemId}
                        value={qualificationLevel.listItemId}
                      >
                        {qualificationLevel.listItemName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="input-container">
              <div className="input-holder">
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">
                    Select Specialization
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Select Specialization"
                    required
                    value={block.specialization}
                    onChange={(e) =>
                      handleSpecialization(
                        index,
                        e.target.value,
                        block?.educationid
                      )
                    }
                  >
                    {teacherSpecialization.map((specialization) => (
                      <MenuItem
                        key={specialization.listItemId}
                        value={specialization.listItemId}
                      >
                        {specialization.listItemName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="flex items-center mb-3 flex-col md:flex-row gap-3">
            <div className="input-container">
              <div className="input-holder Institute-Name">
                <InputLabel id="demo-simple-select-standard-label">
                  Enter Institute Name
                </InputLabel>
                <ReactSearchcomplete
                  index={index}
                  thirdParameter={block?.educationid}
                  handleOnSelect={handleInstituteName}
                  allItems={instituteName}
                  placeholder={block?.institutionName_Name}
                ></ReactSearchcomplete>
              </div>
            </div>
            <div className="input-container">
              <div className="input-holder reactSearchAutocomplete">
                <InputLabel id="demo-simple-select-standard-label">
                  Enter School location
                </InputLabel>
                <LocationByPincode
                  instituteLocation={instituteLocationHandler}
                  index={index}
                  thirdParameter={block?.educationid}
                  defaultValue={block?.InstitutionAddress}
                ></LocationByPincode>
              </div>
            </div>
          </div>
          <div className="flex items-center mb-3 flex-col md:flex-row gap-3">
            <div className="input-container">
              <div className="input-holder University-Name">
                <InputLabel id="demo-simple-select-standard-label">
                  Enter University Name
                </InputLabel>
                <ReactSearchcomplete
                  index={index}
                  thirdParameter={block?.educationid}
                  handleOnSelect={handleUniversityName}
                  allItems={universityName}
                  placeholder={block?.university_Name}
                ></ReactSearchcomplete>
              </div>
            </div>
            <div className="input-container">
              <div className="input-holder">
                <InputLabel id="demo-simple-select-standard-label">
                  Enter Medium of Instruction
                </InputLabel>
                <ReactSearchcomplete
                  index={index}
                  thirdParameter={block?.educationid}
                  handleOnSelect={handleMediumOfInstruction}
                  allItems={instructionMedium}
                  placeholder={block?.mediumofInstruction_Name}
                ></ReactSearchcomplete>
              </div>
            </div>
          </div>
          <div className="flex items-center mb-3 flex-col md:flex-row gap-3">
            <div className="input-container flex-1">
              <div className="input-holder">
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">
                    Select Course Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Course Type"
                    required
                    value={block.coursetype}
                    onChange={(e) =>
                      handleCourseType(
                        index,
                        e.target.value,
                        block?.educationid
                      )
                    }
                  >
                    {teacherCourseType.map((courseType) => (
                      <MenuItem
                        key={courseType.listItemId}
                        value={courseType.listItemId}
                      >
                        {courseType.listItemName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="flex-1 text-right">
              <Button
                size="small"
                onClick={() => handleDeleteBlock(index, block?.educationid)}
                className="delete-btn"
                variant="outlined"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
      <div className="text-right">
        <Button className="" variant="contained" onClick={handleAddBlock}>
          Add More
        </Button>
      </div>
    </div>
  );
};

export default UpdateHigherQualification;

import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import "../HighestQualification/HighestQualification.css";
import LocationByPincode from "../../../LocationByPincode/LocationByPincode";
import useFetchValue from "../../../../Hooks/useFetchValue";
import ReactSearchcomplete from "../../../ReactSearchcomplete/ReactSearchcomplete";

const HighestQualification = ({ setBlocks, blocks, user }) => {
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
        userid: user?.userID,
      },
    ]);
  };
  // QualificationLevel
  const handleQualificationLevelChange = (index, value) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].level = value;
    updatedBlocks[index].userid = user?.userID;
    setBlocks(updatedBlocks);
  };

  //Specialization
  const handleSpecialization = (index, value) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].specialization = value;
    setBlocks(updatedBlocks);
  };

  //InstituteName
  const handleInstituteName = (index, value) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].InstitutionName = value.id;
    setBlocks(updatedBlocks);
  };
  //InstituteLocation

  //universityName
  const handleUniversityName = (index, value) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].university = value.id;
    setBlocks(updatedBlocks);
  };

  const handleMediumOfInstruction = (index, item) => {
    console.log(index);
    const updatedBlocks = [...blocks];
    updatedBlocks[index].mediumofInstruction = item.id;
    setBlocks(updatedBlocks);
  };

  //CourseType
  const handleCourseType = (index, value) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].coursetype = value;
    setBlocks(updatedBlocks);
  };

  const handleDeleteBlock = (index) => {
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index, 1);
    setBlocks(updatedBlocks);
  };

  const instituteLocationHandler = (value, index) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].InstitutionAddress = value.Pincode;
    setBlocks(updatedBlocks);
  };

  return (
    <div>
      <h2 className="education text-center text-lg md:text-xl mb-8 font-semibold">
        ____Highest Qualification___
      </h2>

      {blocks.map((block, index) => (
        <div className="mb-8">
          <div className="flex items-center mb-3 flex-col md:flex-row gap-3">
            <div className="input-container">
              <div className="input-holder">
                
                <FormControl variant="standard" fullWidth >
                  <InputLabel id="demo-simple-select-standard-label">Qualification Level</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Qualification Level"
                    required
                    value={block.level}
                    onChange={(e) =>
                      handleQualificationLevelChange(index, e.target.value)
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
                
                <FormControl variant="standard" fullWidth >
                  <InputLabel id="demo-simple-select-standard-label">Select Specialization</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Select Specialization"
                    required
                    value={block.specialization}
                    onChange={(e) => handleSpecialization(index, e.target.value)}
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
                <ReactSearchcomplete
                  index={index}
                  handleOnSelect={handleInstituteName}
                  allItems={instituteName}
                  placeholder="Enter Institute Name"
                ></ReactSearchcomplete>
              </div>
            </div>
            <div className="input-container">
              <div className="input-holder reactSearchAutocomplete">
                
                <InputLabel id="demo-simple-select-standard-label">Enter School location</InputLabel>
                <LocationByPincode
                  instituteLocation={instituteLocationHandler}
                  index={index}
                ></LocationByPincode>
              </div>
            </div>
          </div>
          <div className="flex items-center mb-3 flex-col md:flex-row gap-3">
            <div className="input-container">
              <div className="input-holder University-Name">
                
                <ReactSearchcomplete
                  index={index}
                  handleOnSelect={handleUniversityName}
                  allItems={universityName}
                  placeholder="Enter University Name"
                ></ReactSearchcomplete>
              </div>
            </div>
            <div className="input-container">
              <div className="input-holder">
                <ReactSearchcomplete
                  index={index}
                  handleOnSelect={handleMediumOfInstruction}
                  allItems={instructionMedium}
                  placeholder="Enter Medium of Instruction"
                ></ReactSearchcomplete>
              </div>
            </div>
          </div>
          <div className="flex items-center mb-3 flex-col md:flex-row gap-3">
            <div className="input-container flex-1">
              <div className="input-holder">
                
                <FormControl variant="standard" fullWidth >
                  <InputLabel id="demo-simple-select-standard-label">Select Course Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Course Type"
                    required
                    value={block.coursetype}
                    onChange={(e) => handleCourseType(index, e.target.value)}
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
                onClick={() => handleDeleteBlock(index)}
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

export default HighestQualification;

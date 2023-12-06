import React from "react";
import useFetchValue from "../../../../../../Hooks/useFetchValue";
import { useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ReactSearchcomplete from "../../../../../../components/ReactSearchcomplete/ReactSearchcomplete";
import LocationByPincode from "../../../../../../components/LocationByPincode/LocationByPincode";
import ReactQuill from "react-quill";

const UpdateTeacherExp = ({
  ApproachText,
  setApproachText,
  setUniversityNameValue,
  ProficiencyDetails,
}) => {
  const [experience, setExperience] = useState(
    ProficiencyDetails?.teacherInfo?.hasteachingexp || ""
  );
  const { getValue: universityName } = useFetchValue("teacherUniversityName");
  const { getValue: periodservice } = useFetchValue("teacherServicePeriod");
  const { getValue: totalExpYear } = useFetchValue("teacherExperienceYear");
  const stripHtmlTags = (html) => {
    // Use a regular expression to remove HTML tags
    return html.replace(/<[^>]*>?/gm, "");
  };

  // text editor function

  const maxCharacterCount = 500;
  const handleChange = (value) => {
    if (value?.length <= maxCharacterCount) {
      console.log(value.length);
      setApproachText(value);
    } else {
      return;
    }
  };
  const characterCount = ApproachText.length;
  const isReadOnly = characterCount >= maxCharacterCount;
  // console.log(isReadOnly);

  const handleuniversityName = (i, value) => {
    const universityValue = value?.id;
    setUniversityNameValue(universityValue);
  };
  return (
    <>
      <Typography
        variant="h6"
        style={{
          fontSize: "15px",
          display: "inline-block",
          marginTop: "4vh",
          marginBottom: "2vh",
        }}
      >
        Do you have experience teaching in school/ Institution or College ?
      </Typography>
      <input
        style={{ marginLeft: "1vw" }}
        className="radio-btn"
        name="exp"
        type="radio"
        value="Y"
        checked={experience.toLowerCase() == "y"}
        onChange={() => setExperience("y")}
      />
      Yes
      <input
        style={{ marginLeft: "1vw" }}
        className="radio-btn"
        name="exp"
        type="radio"
        checked={experience.toLowerCase() == "n"}
        value="N"
        onChange={() => setExperience("n")}
      />
      No
      {experience.toLowerCase() == "y" ? (
        <Grid container spacing={2} className="mb-3">
          <Grid xs={12} sm={6} lg={6} item>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-standard-label">
                Institute/ University Name
              </InputLabel>

              <ReactSearchcomplete
                handleOnSelect={handleuniversityName}
                allItems={universityName}
                placeholder={ProficiencyDetails?.teacherInfo?.university}
              ></ReactSearchcomplete>
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6} lg={6} item>
            <InputLabel id="demo-simple-select-standard-label">
              Enter University location
            </InputLabel>
            <LocationByPincode
              defaultValue={ProficiencyDetails?.teacherInfo?.location}
              locationFieldName="location"
            ></LocationByPincode>
          </Grid>

          <Grid xs={12} sm={6} lg={6} item>
            <FormControl variant="standard" fullWidth>
              <lebel id="demo-simple-select-standard-label">
                Period Of Service
              </lebel>

              <Select
                name="serviceperiod"
                labelId="demo-simple-select-standard-label"
                defaultValue={ProficiencyDetails?.teacherInfo?.serviceperiodId}
              >
                {periodservice.map((period) => (
                  <MenuItem key={period?.listItemId} value={period?.listItemId}>
                    {period?.listItemName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      ) : null}
      <Grid container spacing={2}>
        <Grid xs={12} sm={12} lg={12} item>
          <InputLabel className="mt-5" id="demo-simple-select-standard-label">
            Describe Your Tutoring/ Training Approach and Experience
          </InputLabel>
          <div className="relative h-56">
            <ReactQuill
              defaultValue={"dfdfsfsdfs"}
              value={ApproachText}
              onChange={handleChange}
              placeholder="Start typing..."
              readOnly={isReadOnly}
            />
            <div
              className={`absolute bottom-3 right-3 ${
                characterCount >= 0 ? "text-black" : "text-red-600"
              }`}
            >
              {characterCount}/{maxCharacterCount}
            </div>
          </div>
        </Grid>
        <Grid xs={12} sm={6} lg={6} item>
          <FormControl variant="standard" fullWidth>
            <lebel id="demo-simple-select-standard-label">
              Your total experience
            </lebel>

            <Select
              name="totalExp"
              defaultValue={ProficiencyDetails?.teacherInfo?.expinyearid}
              labelId="demo-simple-select-standard-label"
            >
              {totalExpYear.map((exp) => (
                <MenuItem key={exp?.listItemId} value={exp?.listItemId}>
                  {exp?.listItemName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          className="flex items-center justify-end"
          xs={12}
          sm={6}
          lg={6}
          item
        ></Grid>
                 
      </Grid>
    </>
  );
};

export default UpdateTeacherExp;

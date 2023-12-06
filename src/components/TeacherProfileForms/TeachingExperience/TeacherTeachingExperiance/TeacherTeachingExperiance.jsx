import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TeacherTeachingExperiance.css";
import useFetchValue from "../../../../Hooks/useFetchValue";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import ReactSearchcomplete from "../../../ReactSearchcomplete/ReactSearchcomplete";
import LocationByPincode from "../../../LocationByPincode/LocationByPincode";
const TeacherTeachingExperiance = ({
  ApproachText,
  setApproachText,
  setUniversityNameValue,
}) => {
  const [experience, setExperience] = useState(true);
  const { getValue: universityName } = useFetchValue("teacherUniversityName");
  const { getValue: periodservice } = useFetchValue("teacherServicePeriod");
  const { getValue: totalExpYear } = useFetchValue("teacherExperienceYear");

  //remove html

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
  console.log(isReadOnly);

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
        checked={experience}
        onChange={() => setExperience(true)}
      />
      Yes
      <input
        style={{ marginLeft: "1vw" }}
        className="radio-btn"
        name="exp"
        type="radio"
        value="N"
        onChange={() => setExperience(false)}
      />
      No
      {experience ? (
        <Grid container spacing={2} className="mb-3">
          <Grid xs={12} sm={6} lg={6} item>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-standard-label">
                Institute/ University Name
              </InputLabel>

              <ReactSearchcomplete
                handleOnSelect={handleuniversityName}
                allItems={universityName}
                placeholder="Enter University Name"
              ></ReactSearchcomplete>
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6} lg={6} item>
            <InputLabel id="demo-simple-select-standard-label">Enter University location</InputLabel>
             <LocationByPincode
                locationFieldName="location"
                ></LocationByPincode>
          </Grid>

          <Grid xs={12} sm={6} lg={6} item>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-standard-label">
                Period Of Service
              </InputLabel>
              <Select
                required
                name="serviceperiod"
                labelId="demo-simple-select-standard-label"
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
            <InputLabel id="demo-simple-select-standard-label">
              Your total experience
            </InputLabel>
            <Select
              required
              name="totalExp"
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

export default TeacherTeachingExperiance;

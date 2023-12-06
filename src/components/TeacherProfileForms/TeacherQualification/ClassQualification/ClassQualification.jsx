import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import useFetchValue from "../../../../Hooks/useFetchValue";
import GpsFixedRoundedIcon from "@mui/icons-material/GpsFixedRounded";
import LocationByPincode from "../../../LocationByPincode/LocationByPincode";



const ClassQualification = () => {
  const { getValue: boards } = useFetchValue("teacherBoard")
  const { getValue: passingYear } = useFetchValue("passingYear")
  const [postalCode, setPostalCode] = useState("");
  const [postCode, setPostCode] = useState("");
  const [postalAddress, setPostalAddress] = useState([]);


  useEffect(() => {
    if (postalCode.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${postalCode}`)
        .then((res) => res.json())
        .then((data) => {
          if (data[0].Status == "Success") {
            console.log("postal address", data[0]);
            setPostalAddress(data[0].PostOffice);
          }
        });
    }
  }, [postalCode]);

  const handleSetPostalValue = (e) => {
    setPostalCode(e.Name + ", " + e.Division + ", " + e.Pincode);
    setPostCode(e.Name + ", " + e.Division + ", " + e.Pincode);

  };





  return (
    <div>
      <h2 className="level-heading  text-center text-lg md:text-xl mb-4 font-semibold">
        ___Schooling Background___
      </h2>
      <h6 className="level-heading mb-3 font-medium ">
        Class/Grade 10th Level
      </h6>
      <div className="flex items-center flex-col md:flex-row gap-3 mb-3">
        <div className="input-container w-full">
          <div className="input-holder">
            <FormControl variant="standard" fullWidth >
              <InputLabel id="demo-simple-select-standard-label">Select Board</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Select Board"
                required
                name="tenthBoard"
              >
                
                {
                  boards.map((board) => (
                    <MenuItem key={board.listItemId} value={board.listItemId}>{board.listItemName}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="input-container">
          <div className="input-holder">

            <FormControl variant="standard" fullWidth >
              <InputLabel id="demo-simple-select-standard-label">Year Of Passing</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Select Year Of Passing"
                required
                name="tenthpassingYear"
              >
                {
                passingYear.map((passYear) => (
                  <MenuItem key={passYear.listItemName} value={passYear.listItemName}>{passYear.listItemName}</MenuItem>

                ))
              }
              </Select>
            </FormControl>

          </div>
        </div>
      </div>

      <div className="flex items-center flex-col md:flex-row gap-3 mb-3">
        <div className="input-container">
          <div className="input-holder">
            <TextField
              required
              name="tenthSchoolName"
              fullWidth
              label="School Name"
              variant="standard"
              placeholder="Enter your school name"
            />

          </div>

        </div>
        <div className="input-container">
          <div className="input-holder">
          <InputLabel id="demo-simple-select-standard-label">Enter School location</InputLabel>
            <LocationByPincode
              locationFieldName="tenthSchoolLocation"
            >
            </LocationByPincode>

           

          </div>
        </div>
      </div>
      <h6 className="level-heading twelve mb-3 font-medium">
        Class/Grade 12th Level
      </h6>
      <div className="flex items-center flex-col md:flex-row gap-3 mb-3">
        <div className="input-container">
          <div className="input-holder">
           

            <FormControl variant="standard" fullWidth >
              <InputLabel id="demo-simple-select-standard-label">Select Board</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Select Board"
                required
                name="twelvthBoard"
              >
                {
                boards.map((board) => (
                  <MenuItem key={board.listItemId} value={board.listItemId}>{board.listItemName}</MenuItem>
                ))
              }
              </Select>
            </FormControl>

          </div>
        </div>
        <div className="input-container">
          <div className="input-holder">
            
            <FormControl variant="standard" fullWidth >
              <InputLabel id="demo-simple-select-standard-label">Year of passing</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Year Of Passing"
                required
                name="twelvthpassingYear"
              >
                {
                passingYear.map((passYear) => (
                  <MenuItem key={passYear.listItemName} value={passYear.listItemName}>{passYear.listItemName}</MenuItem>

                ))
              }
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-col md:flex-row gap-3 mb-3">
        <div className="input-container">
          <div className="input-holder">
            <TextField
              required
              name="twelvthSchoolName"
              fullWidth
              label="School Name"
              variant="standard"
              placeholder="Enter School Name"
            />
          </div>
        </div>
        <div className="input-container">
          <div className="input-holder">
          <InputLabel id="demo-simple-select-standard-label">Enter School location</InputLabel>
            <LocationByPincode
              locationFieldName="twelvthSchoolLocation"
            >
            </LocationByPincode>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassQualification;

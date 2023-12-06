import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FaMale, FaFemale } from "react-icons/fa";
import { useEffect } from "react";
import DateOfBirthPicker from "../../../DateOfBirthPicker/DateOfBirthPicker";
import useFetchValue from "../../../../Hooks/useFetchValue";
import LocationByPincode from "../../../LocationByPincode/LocationByPincode";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import ReactSearchcomplete from "../../../ReactSearchcomplete/ReactSearchcomplete";
import axios from "axios";

const StudentInformation = ({
  userInfo,
  setStudentDatOfBirth,
  selectedGender,
  setSelectedGender,
  setInstituteName,
}) => {
  const { getValue: genders } = useFetchValue("gender");
  const { getValue: boards } = useFetchValue("teacherBoard");
  const { getValue: relation } = useFetchValue("relationWithStudent");
  const { getValue: institute } = useFetchValue("teacherInstituteName");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    if (userInfo && userInfo.poc) {
      const fullName = userInfo.poc.split(" ");
      console.log(fullName);

      setFirstName(fullName[0] || ""); // Use an empty string as a fallback if the first name is missing
      setLastName(fullName[1] || ""); // Use an empty string as a fallback if the last name is missing
      setGenderValue(userInfo?.gender);
    }
  }, [userInfo]);


  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/segment`)
      .then((response) => {
        // console.log(response.data);
        if (response?.data) {
          setSegments(response?.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching segments:", error);
      });
  }, []);


  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleInstituteName = (index, value) => {
    setInstituteName(value);
    console.log(value);
  };
  const handleInstituteNameLocation = (value, index) => {
    console.log(value);
  };

  console.log("segments data", segments);

  return (
    <div>
      <h6 className="text-xl font-medium"> Information</h6>
      <div className="flex items-center gap-6 mt-4 mb-6">
        <div className="w-full">
          <label>First Name</label>
          <TextField
            size="small"
            fullWidth
            variant="standard"
            name="firstName"
            value={firstName}
          />
        </div>
        <div className="w-full">
          <label>Last Name</label>
          <TextField
            size="small"
            fullWidth
            variant="standard"
            value={lastName}
            name="lastName"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="flex-1">
          <FormControl variant="standard" className="w-full flex-1">
            <InputLabel id="demo-simple-select-standard-label">
              relationship with student
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="status"
              name="relationwithstudent"
            >
              {relation.map((items) => (
                <MenuItem key={items.listItemId} value={items.listItemId}>
                  {items.listItemName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <FormControl variant="standard" className="w-full flex-1">
          <DateOfBirthPicker
            setDateofBirth={setStudentDatOfBirth}
          ></DateOfBirthPicker>
        </FormControl>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <FormControl className="flex-1">
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {genders?.map((gender) => (
              <FormControlLabel
                value={gender?.listItemId}
                control={<Radio />}
                checked={genderValue === gender.listItemId}
                onChange={handleGenderChange}
                label={gender?.listItemName}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <FormControl variant="standard" className="w-full flex-1">
          <InputLabel id="demo-simple-select-standard-label">
            Studying in
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Studying in"
            name="studingin"
          >
            {
              segments.map((items) => (
                <MenuItem key={items.segmentid} value={items.segmentid}>{items.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>

      <div className="flex w-full  mb-6">
        <FormControl variant="standard" className="w-full flex-1">
          <InputLabel id="demo-simple-select-standard-label">
            Board/council
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="board"
            name="board"
          >
            {boards.map((items) => (
              <MenuItem key={items.listItemId} value={items.listItemId}>
                {items.listItemName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="flex items-center gap-6  mb-6">
        <div className="w-full">
          <FormControl variant="standard" className="w-full flex-1">
            <InputLabel id="demo-simple-select-standard-label">
              name of the institute
            </InputLabel>
            {/* <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="yourprivacy"
              name="nameofinstitute"
            >
              <MenuItem value={10}>University 1</MenuItem>
              <MenuItem value={11}>University 2</MenuItem>
              <MenuItem value={12}>University 3</MenuItem>
              <MenuItem value={13}>University 4</MenuItem>
            </Select> */}
            <ReactSearchcomplete
              allItems={institute}
              handleOnSelect={handleInstituteName}
              placeholder="Enter Institute name"
            ></ReactSearchcomplete>
          </FormControl>
        </div>
        <div className="w-full">
          <label>Institute Location</label>
          {/* <TextField
            size="small"
            fullWidth
            variant="standard"
            name="locationInstitute"
          /> */}
          <LocationByPincode
            locationFieldName="locationInstitute"
            instituteLocation={handleInstituteNameLocation}
          ></LocationByPincode>
        </div>
      </div>
    </div>
  );
};

export default StudentInformation;

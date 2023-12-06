import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SocialLink from "./SocialLink/SocialLink";
import useFetchValue from "../../../../Hooks/useFetchValue";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import moment from "moment/moment";
import DateOfBirthPicker from "../../../DateOfBirthPicker/DateOfBirthPicker";

const PersonalInformation = ({ userInfo, setDateofBirth }) => {
  console.log(userInfo);
  const { getValue: genders } = useFetchValue("gender");
  const { getValue: maritalStatus } = useFetchValue("maritalStatus");
  const { getValue: vehicleOwned } = useFetchValue("vehicleOwned");
  const { getValue: privacy } = useFetchValue("contactDisplay");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [genderValue, setGenderValue] = useState('')

  useEffect(() => {
    if (userInfo && userInfo.poc) {
      const fullName = userInfo.poc.split(" ");
      console.log(fullName);

      setFirstName(fullName[0] || ""); // Use an empty string as a fallback if the first name is missing
      setLastName(fullName[1] || ""); // Use an empty string as a fallback if the last name is missing
      setGenderValue(userInfo?.gender)
    }
  }, [userInfo]);





  return (
    <div>
      <h6 className="text-xl font-medium">Personal Information</h6>
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
            name="lastName"
            value={lastName}
          />
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="flex-1">
          <FormControl variant="standard" className="w-full flex-1">
            <InputLabel id="demo-simple-select-standard-label">
              Gender :
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="status"
              name="gender"
              value={genderValue}
              readOnly
            >
              {genders &&
                genders?.map((gender) => (
                  <MenuItem value={gender?.listItemId} key={gender.listItemId}>
                    {gender?.listItemName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

        </div>


        <FormControl variant="standard" className="w-full flex-1">
          <InputLabel id="demo-simple-select-standard-label">
            Marital Status
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="status"
            name="maritalStatus"
          >
            {
              maritalStatus.map((items) => (
                <MenuItem value={items?.listItemId} key={items.listItemId}>
                  {items?.listItemName}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <FormControl variant="standard" className="">
          <DateOfBirthPicker
            setDateofBirth={setDateofBirth}
          >
          </DateOfBirthPicker>
        </FormControl>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <FormControl variant="standard" className="w-full flex-1">
          <InputLabel id="demo-simple-select-standard-label">
            Vehicles Owned
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="vehicleOwned"
            name="vehicleOwned"
          >
            {
              vehicleOwned.map((items) => (
                <MenuItem value={items?.listItemId} key={items.listItemId}>
                  {items?.listItemName}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <FormControl variant="standard" className="w-full flex-1">
          <InputLabel id="demo-simple-select-standard-label">
            Set Your Privacy
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="yourprivacy"
            name="yourprivacy"
          >
            {
              privacy.map((items)=>(
                <MenuItem value={items?.listItemId} key={items.listItemId}>
                  {items?.listItemName}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
      <SocialLink></SocialLink>
    </div>
  );
};

export default PersonalInformation;

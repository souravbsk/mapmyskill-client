import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  FaFacebook,
  FaGooglePlusG,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import useFetchValue from "../../../../../Hooks/useFetchValue";
import DateOfBirthPicker from "../../../../../components/DateOfBirthPicker/DateOfBirthPicker";
import ButtonSubmit from "../../../../../components/ButtonSubmit/ButtonSubmit";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateTeacherPersonalInformation = ({ user, personalInfo }) => {
  console.log("userinfo", user);
  console.log("personalInfo", personalInfo);

  const { getValue: maritalStatus } = useFetchValue("maritalStatus");
  const { getValue: vehicleOwned } = useFetchValue("vehicleOwned");
  const { getValue: privacy } = useFetchValue("contactDisplay");
  const [dateofBirth, setDateofBirth] = useState("");
  const userid = user?.userid;
  const defaultDate = personalInfo?.dateofbirth;
  console.log("defaultDate", defaultDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const maritalStatus = form.maritalStatus.value;
    const dob = dateofBirth || defaultDate;
    const vehicleOwned = form.vehicleOwned.value;
    const yourprivacy = form.yourprivacy.value;
    const facebooklink = form.facebooklink.value;
    const twitterlink = form.twitterlink.value;
    const linkdinlink = form.linkdinlink.value;
    const googlelink = form.googlelink.value;

    const personalInformationPayload = {
      maritalstatus: maritalStatus,
      Vechiclesowend: vehicleOwned,
      yourprivacy: yourprivacy,
      facebookLink: facebooklink,
      tweeterLink: twitterlink,
      linkedinLink: linkdinlink,
      googleLink: googlelink,
      dateofbirth: dob,
    };

    console.log("personalInformationPayload", personalInformationPayload);

    axios
      .put(
        `http://localhost:8080/api/personalinfo/${userid}`,
        personalInformationPayload
      )
      .then((response) => {
        console.log("personal info response", response);
        if (response.statusText == "OK") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Personal information updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })

      .catch((error) => {
        console.error("Error updating Teacher personal information", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <ul className="flex flex-col md:flex-row items-center  gap-6 mb-6 w-full">
            <li className="flex items-end w-full gap-2">
              <FormControl variant="standard" className="w-full flex-1">
                <InputLabel id="demo-simple-select-standard-label">
                  Marital Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="status"
                  name="maritalStatus"
                  defaultValue={personalInfo?.maritalstatus}
                >
                  {maritalStatus.map((items) => (
                    <MenuItem value={items?.listItemId} key={items.listItemId}>
                      {items?.listItemName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </li>

            {/* TO DO- Show the default date of birth */}

            <li className="flex items-end w-full gap-2">
              <FormControl variant="standard" className="w-full">
                <DateOfBirthPicker
                  defaultDate={defaultDate}
                  setDateofBirth={setDateofBirth}
                ></DateOfBirthPicker>
              </FormControl>
            </li>
          </ul>
        </div>

        <div>
          <ul className="flex flex-col md:flex-row items-center  gap-6 mb-6 w-full">
            <li className="flex items-end w-full gap-2">
              <FormControl variant="standard" className="w-full flex-1">
                <InputLabel id="demo-simple-select-standard-label">
                  Vehicles Owned
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="vehicleOwned"
                  name="vehicleOwned"
                  defaultValue={personalInfo?.Vechiclesowend}
                >
                  {vehicleOwned.map((items) => (
                    <MenuItem value={items?.listItemId} key={items.listItemId}>
                      {items?.listItemName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </li>
            <li className="flex items-end w-full gap-2">
              <FormControl variant="standard" className="w-full flex-1">
                <InputLabel id="demo-simple-select-standard-label">
                  Set Your Privacy
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="yourprivacy"
                  name="yourprivacy"
                  defaultValue={personalInfo?.yourprivacy}
                >
                  {privacy.map((items) => (
                    <MenuItem value={items?.listItemId} key={items.listItemId}>
                      {items?.listItemName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </li>
          </ul>
        </div>

        <div>
          <ul className="flex flex-col md:flex-row items-center  gap-6 mb-6 w-full">
            <li className="flex items-end w-full gap-2">
              <FaFacebook size={26}></FaFacebook>{" "}
              <TextField
                size="small"
                fullWidth
                label="Enter your facebook link"
                variant="standard"
                name="facebooklink"
                defaultValue={personalInfo?.facebookLink}
              />
            </li>
            <li className="flex items-end w-full gap-2">
              <FaTwitter size={26}></FaTwitter>{" "}
              <TextField
                size="small"
                fullWidth
                label="Enter your twitter link"
                variant="standard"
                name="twitterlink"
                defaultValue={personalInfo?.tweeterLink}
              />
            </li>
          </ul>
          <ul className="flex items-center  flex-col md:flex-row gap-6 mb-6 w-full">
            <li className="flex items-end w-full gap-2">
              <FaLinkedin size={26}></FaLinkedin>{" "}
              <TextField
                size="small"
                fullWidth
                label="Enter your linkedin link"
                variant="standard"
                name="linkdinlink"
                defaultValue={personalInfo?.linkedinLink}
              />
            </li>
            <li className="flex items-end w-full gap-2">
              <FaGooglePlusG size={26}></FaGooglePlusG>{" "}
              <TextField
                size="small"
                fullWidth
                label="Enter your google+ link"
                variant="standard"
                name="googlelink"
                defaultValue={personalInfo?.googleLink}
              />
            </li>
          </ul>
        </div>
        <ButtonSubmit alignValue="right" btnText="Save & Update"></ButtonSubmit>
      </form>
    </div>
  );
};

export default UpdateTeacherPersonalInformation;

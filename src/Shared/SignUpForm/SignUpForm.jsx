import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import GpsFixedRoundedIcon from "@mui/icons-material/GpsFixedRounded";
import "./SignupForm.css";
import axios from "axios";
import instance from "../../config/axios.config";
import Swal from "sweetalert2";
import useFetchValue from "../../Hooks/useFetchValue";
import { StepperProvider } from "../../Providers/ShowSteperProvider";
import MultiSelectField from "../../components/MultiSelectField/MultiSelectField";
const SignUpForm = ({ roleId }) => {
  const { setStep } = useContext(StepperProvider);
  const [user, setUser] = useState(localStorage.getItem("user_Info"));
  const [personName, setPersonName] = useState([]);
  const [postalCode, setPostalCode] = useState("");
  const [postalAddress, setPostalAddress] = useState([]);
  const { getValue: genders } = useFetchValue("gender");
  const { getValue: interests } = useFetchValue("interestedin");
  const { getValue: institueCategorys } = useFetchValue("InstituteCategory");
  const [postCode, setPostCode] = useState("");
  const [interestedinValues, setInterestedinValues] = useState([]);
  const listId = interests[0]?.listid;
  const [ismultiselect, setmultiselect] = useState(true);

  console.log(interestedinValues);

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

  const handleCreateAccount = (e) => {
    e.preventDefault();
    const form = e.target;
    const fullname = form?.fullname?.value;
    const contactperson = form?.contactperson?.value || null;
    const email = form?.email?.value;
    const institutename = form?.institutename?.value || null;
    const gender = form?.gender?.value || null;
    const whatsappnumber = form?.whatsappnumber?.value || null;
    const password = form?.password?.value || null;
    const conpassword = form?.conpassword?.value || null;
    const address1 = postCode || null;
    const address2 = form?.address2?.value || null;
    // const interestedin = form?.interestedin?.value || null;
    const institueCategory = form?.institueCategory?.value || null;
    const terms = form?.terms.checked || null;
    //number split
    const numberPhone = form?.mobile?.value;
    const numberArray = numberPhone.split(" ");
    const isdcode = numberArray[0];
    const mobile = numberArray[1].replace(/[-+]/g, "");

    console.log("interested values", interestedinValues);

    //email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Email",
      });
      return;
    }
    //phone validation
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(mobile)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Phone Number",
      });
      return;
    }
    //whatsapp validation
    if (!phonePattern.test(whatsappnumber)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Whatsapp Number, Only 10 digit accepted",
      });
      return;
    }
    //password validation
    if (password != conpassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "password doesn't match",
      });
      return;
    }
    //check terms and condition
    if (!terms) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Accept Terms & Condition",
      });

      return;
    }

    const NewUserPayload = {
      roleid: roleId,
      isdcode,
      mobile,
      email,
      password,
    };
    // user exist checking
    instance
      .get(`http://localhost:8080/api/users/${email}/${mobile}`)
      .then((res) => {
        console.log(res);
        if (res?.data?.exist) {
          Swal.fire({
            icon: "error",
            title: "Sorry",
            text: "User Mobile or Email Already Exist",
          });
        } else if (!res.data?.exist) {
          // user new added
          instance
            .post("http://localhost:8080/api/users", NewUserPayload)
            .then((userRes) => {
              console.log(userRes);
              if (userRes.statusText == "OK") {
                const payLoad = {
                  roleId,
                  userid: userRes?.data?.data?.id,
                  instituteName: institutename,
                  poc: contactperson || fullname,
                  emailId: email,
                  isEmailVarified: "N",
                  primaryContact: mobile,
                  isContactVarified: "N",
                  whatsappNumber: whatsappnumber,
                  gender: gender,
                  // interestedIn: interestedin,
                  instituteCategory: institueCategory,
                  address1: address1,
                  address2: address2,
                  isAgreeTnc: "Y",
                };


                axios
                  .post("http://localhost:8080/api/profile", payLoad)
                  .then((newProfileResponse) => {
                    console.log("response=", newProfileResponse?.data);
                    if (newProfileResponse.statusText == "OK") {
                      const interestedPayload = {
                        userid: userRes?.data?.data?.id,
                        listitemid: interestedinValues,
                        listid: listId,
                      };

                      axios
                        .post(
                          "http://localhost:8080/api/systemlistdata",
                          interestedPayload
                        )
                        .then((intResponse) => {
                          if (intResponse.statusText == "OK") {

                            Swal.fire({
                              position: "center",
                              icon: "success",
                              title: "Create Account Successful",
                              showConfirmButton: false,
                              timer: 1500,
                            });
                            const userStore = {
                              email,
                              numberPhone,
                              userID: userRes?.data?.data?.id,
                            };
                            localStorage.setItem(
                              "user_Info",
                              JSON.stringify(userStore)
                            );

                            // Token set
                            const token = userRes?.data?.tokenData?.token;
                            if (token) {
                              localStorage.setItem("mapmyskill-token", token);
                            }

                            localStorage.setItem("stepper", 1);
                            setStep(1);
                            form.reset();
                            setPostalCode("");
                            setPersonName([]);
                          }
                        });
                    }
                  });
              }
            });
        }
      });
  };

  const handleSetPostalValue = (e) => {
    setPostalCode(e.Name + ", " + e.Division + ", " + e.Pincode);
    setPostCode(e.Name + ", " + e.Division + ", " + e.Pincode);
  };

  const handleinterestin = (value) => {
    console.log(value);
    if (value.length > 0) {
      setmultiselect(false);
    } else {
      setmultiselect(true);
    }

    const listitemidvalue = value.map((item) => item?.listItemId);
    console.log(listitemidvalue);
    setInterestedinValues(listitemidvalue);
  };

  return (
    <div>
      <form
        onSubmit={handleCreateAccount}
        className=" w-full md:w-7/12 mx-auto px-0 md:px-4 py-4 mt-8 border-2 shadow-emerald-100" //signup_holder
      >
        <div className="w-full mb-6">
          {roleId == 3 ? (
            <TextField
              type="text"
              required
              id="outlined-basic"
              label="Full Name"
              variant="standard"
              fullWidth
              className="data_container"
              name="fullname"
            />
          ) : (
            <TextField
              type="text"
              required
              id="outlined-basic"
              label="Contact Person name"
              variant="standard"
              fullWidth
              className="data_container"
              name="contactperson"
            />
          )}
        </div>

        <div className="flex items-center gap-6 mb-6 flex-col md:flex-row w-full">
          <div className=" w-full">
            <TextField
              type="text"
              fullWidth
              required
              id="standard-basic"
              label="Enter Email"
              variant="standard"
              className="data_container w-full"
              name="email"
            />
          </div>

          {roleId == 5 ? (
            <div className=" w-full">
              <TextField
                type="text"
                required
                id="outlined-basic"
                label="Name of Institute"
                variant="standard"
                fullWidth
                className="data_container"
                name="institutename"
              />
            </div>
          ) : (
            <div className="w-full">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  fullWidth
                  required
                  labelId="demo-simple-select-label"
                  className="text-xl w-full py-0 rounded"
                  label="Gender"
                  name="gender"
                >
                  {genders &&
                    genders?.map((gender) => (
                      <MenuItem
                        value={gender?.listItemId}
                        key={gender.listItemId}
                      >
                        {gender?.listItemName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          )}
        </div>

        <div className=" flex flex-col md:flex-row items-center w-full gap-6 mb-6">
          <PhoneInput
            inputProps={{
              name: "mobile",
              required: true,
              autoFocus: true,
              className:
                "border-[#909090] ps-16 text-xl border w-full py-3 rounded",
            }}
            className=""
            country={"in"}
            onlyCountries={["in"]}
          />

          <TextField
            type="number"
            required
            id="standard-basic"
            label="Enter Whatsapp number"
            variant="standard"
            className="data_container w-full"
            name="whatsappnumber"
          />
        </div>

        <div className="flex items-center flex-col md:flex-row gap-6 mb-6 w-full">
          <TextField
            type="password"
            required
            id="standard-basic"
            label="Enter Password"
            variant="standard"
            className="data_container w-full"
            name="password"
          />

          <TextField
            type="password"
            required
            id="standard-basic"
            label="Confirm password"
            variant="standard"
            className="data_container w-full"
            name="conpassword"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <div className="w-full pincodeLocation">
            <div className="flex items-center">
              <TextField
                value={postalCode}
                type="text"
                id="standard-basic"
                required
                label="Search location by pin code....."
                variant="standard"
                className="data_container w-full"
                name="address1"
                onChange={(e) => setPostalCode(e.target.value)}
              />
              {/* <GpsFixedRoundedIcon className="gpsicon" /> */}
            </div>

            {
              postalAddress.length > 0 && <ul
                className={`absolute rounded text-black z-20 max-w-full bg-gray-200 space-y-2 ${postalCode.toString().split("").length === 6
                  ? "list_disp"
                  : "list_hide"}`
                }
              >
                {postalCode.toString().split("").length === 6
                  ? postalAddress.map((e) => (
                    <li
                      className="postallist hover:bg-[rgb(25,118,210)] hover:text-white p-2 rounded "
                      key={e.Name}
                      onClick={() => handleSetPostalValue(e)}
                    >
                      {e.Name + ", " + e.Division + ", " + e.Pincode}
                    </li>
                  ))
                  : null}
              </ul>
            }
          </div>
          <div className=" w-full">
            <TextField
              type="text"
              id="standard-basic"
              label="Enter Postal address"
              variant="standard"
              className="data_container w-full"
              name="address2"
            />
          </div>
        </div>

        <div className="flex items-center flex-col md:flex-row gap-6 mb-6">
          <div className="w-full">
            <FormControl fullWidth>
              <MultiSelectField
                displayValue="listItemName"
                defaultPlaceHolder="select interest in"
                items={interests}
                handleMultiSelect={handleinterestin}
                setmultiselect={setmultiselect}
                ismultiselect={ismultiselect}
              ></MultiSelectField>
            </FormControl>
          </div>
          {roleId == 5 && (
            <div className="w-full">
              <InputLabel id="demo-multiple-name-label">
                institute Category
              </InputLabel>
              <Select
                name="institueCategory"
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                required
                className="w-full"
              >
                {institueCategorys &&
                  institueCategorys?.map(({ listItemName, listItemId }) => (
                    <MenuItem key={listItemId} value={listItemId}>
                      {listItemName}
                    </MenuItem>
                  ))}
              </Select>
            </div>
          )}
        </div>
        <div className="terms">
          <input name="terms" type="checkbox" />
          <p>I agree to the terms & conditions.</p>
        </div>

        <div className="text-right">
          <button className="signUp"> Create Account</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;

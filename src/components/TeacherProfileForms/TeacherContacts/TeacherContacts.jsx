import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// =========Material UI import start===========
import { TextField, Button } from "@mui/material";
// =========Material UI import End===========
import "./TeacherContacts.css";
import PrimaryContact from "./PrimaryContact/PrimaryContact";
import PresentAddress from "./PresentAddress/PresentAddress";
import PermanentAddress from "./PermanentAddress/PermanentAddress";
import PersonalInformation from "./PersonalInformation/PersonalInformation";
import axios from "axios";
import Swal from "sweetalert2";
import useFetchValue from "../../../Hooks/useFetchValue";
import { useNavigate } from "react-router-dom";
const TeacherContacts = () => {
  const [isPermanentddress, setPermanentddress] = useState("y");
  const [userInfo, setUserInfo] = useState({});
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const { getValue: addressType } = useFetchValue("addressType");
  console.log(addressType);

  //present Address city state country pin get
  const [presentAddressDetails, setPresentAddressDetails] = useState({
    city: "",
    state: "",
    country: "",
    pin: "",
  });
  const [permanentAddressDetails, setPermanentAddressDetails] = useState({
    city: "",
    state: "",
    country: "",
    pin: "",
  });

  const [dateofBirth, setDateofBirth] = useState("");

  useEffect(() => {
    const userInfoStore = localStorage.getItem("user_Info");
    const userInfoParse = JSON.parse(userInfoStore);
    if (userInfoStore) {
      setUserId(userInfoParse?.userID);
      axios
        .get(
          `http://localhost:8080/api/profile/byUserId/${userInfoParse?.userID}`
        )
        .then((res) => {
          setUserInfo(res.data);
        });
    }
  }, []);

  console.log(userInfo);

  const numberCracker = (phoneNumber) => {
    const numberArray = phoneNumber.split(" ");
    const isdcode = numberArray[0];
    const alterNativeNumber = numberArray[1]?.replace(/[-+]/g, "");
    return alterNativeNumber;
  };

  const handleSubmitTeacherContact = (e) => {
    e.preventDefault();
    const form = e.target;
    // contact information
    const alternativephoneNumber = form.alternativephoneNumber.value;
    const landLinePhoneNumber = form.landLinePhoneNumber.value;
    //personalinfo
    const maritalStatus = form.maritalStatus.value;
    const vehicleOwned = form.vehicleOwned.value;
    const yourprivacy = form.yourprivacy.value;
    const facebooklink = form.facebooklink.value;
    const twitterlink = form.twitterlink.value;
    const linkdinlink = form.linkdinlink.value;
    const googlelink = form.googlelink.value;
    const alterNativeNumber = numberCracker(alternativephoneNumber);
    const landLineNumber = numberCracker(landLinePhoneNumber);
    const presentAddressLine1 = form.presentAddressLine1.value;
    const presentAddressLine2 = form.presentAddressLine2.value;
    const presentAddressLandmark = form.presentAddressLandmark.value;
    const isPermanent = form.IsPermanentaddress.value;
    const permanentAddressLine1 = form.permanentAddressLine1?.value;
    const permanentAddressLine2 = form.permanentAddressLine2?.value;
    const permanentAddressLandmark = form.permanentAddressLandmark?.value;

    console.log(landLineNumber);
    //phone validation
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(alterNativeNumber)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid alternative Number",
      });
      return;
    }
    if (!phonePattern.test(landLineNumber)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Land line Number",
      });
      return;
    }

    const userAddress = [
      {
        userid: userId,
        addressline1: presentAddressLine1,
        addressline2: presentAddressLine2,
        landmark: presentAddressLandmark,
        city: presentAddressDetails?.city,
        state: presentAddressDetails?.state,
        country: presentAddressDetails?.country,
        pin: presentAddressDetails?.pin,
        addressType: addressType[0]?.listItemId,
        isSameAddress: isPermanent,
      },
      isPermanent == "n"
        ? {
            userid: userId,
            addressline1: permanentAddressLine1,
            addressline2: permanentAddressLine2,
            landmark: permanentAddressLandmark,
            city: permanentAddressDetails?.city,
            state: permanentAddressDetails?.state,
            country: permanentAddressDetails?.country,
            pin: permanentAddressDetails?.pin,
            addressType: addressType[1]?.listItemId,
            isSameAddress: isPermanent,
          }
        : undefined, // Set to undefined if isSameAddress is "Yes"
    ].filter(Boolean); // Remove undefined elements
    console.log(userAddress);

    const contactInfoPayload = {
      landlineNumber: landLineNumber,
      alternativeNumber: alterNativeNumber,
    };

    if (userId) {
      axios
        .put(`http://localhost:8080/api/profile/${userId}`, contactInfoPayload)
        .then((res) => {
          if (res.data.success) {
            axios
              .post("http://localhost:8080/api/address", userAddress)
              .then((res) => {
                if (res.data.success) {
                  const personalInformationPayload = {
                    userid: userId,
                    maritalstatus: maritalStatus,
                    Vechiclesowend: vehicleOwned,
                    yourprivacy: yourprivacy,
                    facebookLink: facebooklink,
                    tweeterLink: twitterlink,
                    linkedinLink: linkdinlink,
                    googleLink: googlelink,
                    dateofbirth: dateofBirth,
                  };
                  axios
                    .post(
                      "http://localhost:8080/api/personalinfo",
                      personalInformationPayload
                    )
                    .then((res) => {
                      if (res.data.data) {
                        Swal.fire({
                          position: "center",
                          icon: "success",
                          title: "Contact Information Seccessfully added",
                          showConfirmButton: false,
                          timer: 1500,
                        });

                        localStorage.removeItem("user_Info");
                        localStorage.removeItem("roleId");
                        localStorage.removeItem("stepper");
                        navigate("/myaccount/dashboard/");
                      }
                    });
                }
              });
          }
        });
    }
  };

  return (
    <div className="mt-12">
      <form
        onSubmit={handleSubmitTeacherContact}
        className="max-w-full border rounded-lg px-4 py-3 w-8/12 mx-auto "
      >
        <PrimaryContact userInfo={userInfo}></PrimaryContact>
        <PresentAddress
          presentAddressDetails={presentAddressDetails}
          setPresentAddressDetails={setPresentAddressDetails}
          userInfo={userInfo}
        ></PresentAddress>
        <div className="">
          <div className="flex items-center gap-5">
            <span>Is the above address your permanent address ?</span>
            <div className="flex items-center gap-3">
              <label htmlFor="">
                <input
                  className="radio-btn"
                  name="IsPermanentaddress"
                  type="radio"
                  value="y"
                  checked={isPermanentddress == "y"}
                  onChange={(e) => setPermanentddress(e.target.value)}
                />
                Yes
              </label>
              <label htmlFor="">
                <input
                  className="radio-btn"
                  name="IsPermanentaddress"
                  type="radio"
                  value="n"
                  checked={isPermanentddress == "n"}
                  onChange={(e) => setPermanentddress(e.target.value)}
                />
                No
              </label>
            </div>
          </div>
        </div>
        <PermanentAddress
          setPermanentAddressDetails={setPermanentAddressDetails}
          permanentAddressDetails={permanentAddressDetails}
          isPermanentddress={isPermanentddress}
          setPermanentddress={setPermanentddress}
        ></PermanentAddress>
        <PersonalInformation
          setDateofBirth={setDateofBirth}
          userInfo={userInfo}
        ></PersonalInformation>
        <div className="text-left mt-6">
          <button className="px-4 py-2 bg-[#1565C0] rounded-md text-white uppercase text-sm font-medium">
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherContacts;

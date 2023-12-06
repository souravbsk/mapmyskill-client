import React, { useContext, useEffect, useState } from "react";
import StudentAddress from "./StudentAddress/StudentAddress";
import StudentInformation from "./StudentInformation/StudentInformation";
import ButtonSubmit from "../../ButtonSubmit/ButtonSubmit";
import StudentPrimaryContact from "./StudentPrimaryContact/StudentPrimaryContact";
import axios from "axios";
import Swal from "sweetalert2";
import useFetchValue from "../../../Hooks/useFetchValue";
import { StepperProvider } from "../../../Providers/ShowSteperProvider";

function StudentContact() {
  const [userInfo, setUserInfo] = useState({});
  const [userId, setUserId] = useState("");
  const { step, setStep } = useContext(StepperProvider);

  const [instituteName, setInstituteName] = useState("");
  //console.log(instituteName);

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
          //console.log(res);
          setUserInfo(res?.data);
        });
    }
  }, []);

  const [studentLocation, setStudentLocation] = useState({
    city: "",
    state: "",
    country: "",
    pin: "",
  });

  const [studentDateofbirth, setStudentDatOfBirth] = useState("");

  //console.log(studentLocation);

  const [selectedGender, setSelectedGender] = useState("");

  const numberCracker = (phoneNumber) => {
    const numberArray = phoneNumber.split(" ");
    const isdcode = numberArray[0];
    const alterNativeNumber = numberArray[1]?.replace(/[-+]/g, "");
    return alterNativeNumber;
  };

  const { getValue: addressType } = useFetchValue("addressType");

  const handleStudentContact = (e) => {
    e.preventDefault();
    const form = e.target;
    const landLinePhoneNumber = form?.landLinePhoneNumber?.value;
    const alternativephoneNumber = form?.alternativephoneNumber?.value;
    const Addressline1 = form.Addressline1.value;
    const Addressline2 = form.Addressline2.value;
    const landmark = form?.landmark.value;
    const relationwithstudent = form?.relationwithstudent.value;
    const board = form?.board.value;
    const studingin = form?.studingin.value;
    const locationInstitute = form?.locationInstitute?.value;
    const alterNativeNumber = numberCracker(alternativephoneNumber);
    const landLineNumber = numberCracker(landLinePhoneNumber);

    // alternative number and landline number verify
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

    const contactInfoPayload = {
      landlineNumber: landLineNumber,
      alternativeNumber: alterNativeNumber,
    };

    if (userId) {
      axios
        .put(`http://localhost:8080/api/profile/${userId}`, contactInfoPayload)
        .then((res) => {
          //console.log(res);
          if (res.data.success) {
            const userAddress = [
              {
                userid: userId,
                addressline1: Addressline1,
                addressline2: Addressline2,
                landmark: landmark,
                ...studentLocation,
                addressType: addressType[0]?.listItemId,
                isSameAddress: "y",
              },
            ];

            axios
              .post("http://localhost:8080/api/address", userAddress)
              .then((res) => {
                //console.log(res);
                if (res.data.success) {
                  const personalInfoPayload = {
                    userid: userId,
                    relationwithstudent: relationwithstudent,
                    dateofbirth: studentDateofbirth,
                    studyingin: studingin,
                    board: board,
                    institutename: instituteName?.id,
                    institutelocation: locationInstitute,
                  };
                  axios
                    .post(
                      "http://localhost:8080/api/studentpersonalinfo",
                      personalInfoPayload
                    )
                    .then((res) => {
                      //console.log(res);
                      if (res.data.success) {
                        Swal.fire({
                          position: "center",
                          icon: "success",
                          title: "Student Contact Information Added",
                          showConfirmButton: false,
                          timer: 1500,
                        });

                        setStep(3);
                        localStorage.setItem("stepper", JSON.stringify(3));
                      }
                    });
                }
              });
          }
        });
    }
  };

  return (
    <form
      onSubmit={handleStudentContact}
      className="max-w-full border-2 shadow-md rounded-lg px-6 py-12 w-8/12 mx-auto"
    >
      <StudentPrimaryContact userInfo={userInfo}></StudentPrimaryContact>
      <StudentAddress
        studentLocation={studentLocation}
        setStudentLocation={setStudentLocation}
        userInfo={userInfo}
      ></StudentAddress>
      <StudentInformation
        setStudentDatOfBirth={setStudentDatOfBirth}
        userInfo={userInfo}
        setSelectedGender={setSelectedGender}
        selectedGender={selectedGender}
        setInstituteName={setInstituteName}
      ></StudentInformation>
      <ButtonSubmit alignValue="right"></ButtonSubmit>
    </form>
  );
}

export default React.memo(StudentContact);

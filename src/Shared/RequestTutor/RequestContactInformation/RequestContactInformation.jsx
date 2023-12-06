import React, { useContext, useEffect, useState } from 'react';
import { ReqStepperProvider } from '../../../Providers/HireTutorStepperProvider';
import StudentPrimaryContact from './ReqContactDetails/StudentPrimaryContact';
import ButtonSubmit from '../../../components/ButtonSubmit/ButtonSubmit';
import StudentAddress from './ReqContactDetails/StudentAddress';
import StudentInformation from './ReqContactDetails/StudentInformation';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useFetchValue from '../../../Hooks/useFetchValue';

const RequestContactInformation = () => {
    const { setStep } = useContext(ReqStepperProvider)
    const [studentDateofbirth, setStudentDatOfBirth] = useState("");
    const [instituteName, setInstituteName] = useState("");
    const navigate = useNavigate()
    const [address1, setAddress1] = useState("")
    const { getValue: addressType } = useFetchValue("addressType");
    const [storedData, setStoredData] = useState([])

    useEffect(() => {
        const data = localStorage.getItem("hireTutorData");
        if (data) {
            const prevData = JSON.parse(data)
            prevData ? setStoredData(prevData) : null
        }

    }, [])


    const handlePostalAddress = (value) => {
        value ? setAddress1(value) : null

    }

    const handleStudentContact = (e) => {
        e.preventDefault();
        const form = e.target;

        const primaryContact = form?.mobile?.value;
        const [isdCode, primaryMobile] = primaryContact.split(" ")
        const primaryMob = primaryMobile.replace("-", "")

        const alternativephoneNumber = form?.alternativephoneNumber?.value;
        const [a, alter] = alternativephoneNumber.split(" ")
        let newAlternativeNum = alter.replace("-", "");

        const landLinePhoneNumber = form?.landLinePhoneNumber?.value;
        const [b, land] = landLinePhoneNumber.split(" ")
        let newLandLine = land.replace("-", "");

        const whatsappNumber = form?.whatsappnumber?.value;
        const [c, whats] = whatsappNumber.split(" ")
        let newWhatsapp = whats.replace("-", "");

        const email = form?.email?.value;
        const password = form?.password?.value;
        const conpassword = form?.conpassword?.value;

        const Addressline1 = form?.contactUpdateAddress1?.value;
        const Addressline2 = form?.Addressline2?.value;
        const landmark = form?.landmark?.value;

        const firstName = form?.firstName?.value;
        const lastName = form?.lastName?.value;
        const fullName = firstName + " " + lastName

        const relationwithstudent = form?.relationwithstudent?.value;
        const dob = studentDateofbirth;
        const gender = form?.gender?.value;
        const studingin = form?.studingin?.value;
        const board = form?.board?.value;
        const nameOfInstitute = instituteName?.id;
        const locationInstitute = form?.locationInstitute?.value;
        const terms = form?.terms.checked || null;

        //Email pattern validation
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
        if (!phonePattern.test(primaryMob)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid Phone Number, Enter a valid 10 digit number after +91",
            });
            return;
        }
        //alternate phone validation
        if (!phonePattern.test(newAlternativeNum)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid alternate Number, Enter a valid 10 digit number after +91",
            });
            return;
        }
        //landline phone validation
        if (!phonePattern.test(newLandLine)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid landline Number, Enter a valid 10 digit number after +91",
            });
            return;
        }
        // whatsapp validation
        if (!phonePattern.test(newWhatsapp)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid Whatsapp Number, Enter a valid 10 digit number after +91 ",
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


        const newUsersPayload = {
            roleid: 4,
            isdcode: isdCode,
            mobile: primaryMob,
            email: email,
            password: conpassword,
        }

        const localMobile = primaryContact

        axios.get(`http://localhost:8080/api/users/${email}/${primaryMob}`)
            .then((response) => {
                //console.log(response);
                if (response?.data?.exist) {
                    Swal.fire({
                        icon: "error",
                        title: "Sorry",
                        text: "User Mobile or Email Already Exist",
                    });
                } else if (!response?.data?.exist) {

                    axios.post(`http://localhost:8080/api/users`, newUsersPayload)
                        .then((userRes) => {
                            //console.log("User created", userRes);
                           
                            if (userRes.statusText == "OK") {
                               

                                const profilePayLoad = {
                                    userid: userRes?.data?.data?.id,
                                    instituteName: "",
                                    poc: fullName,
                                    emailId: email,
                                    isEmailVarified: "N",
                                    primaryContact: primaryMob,
                                    isContactVarified: "N",
                                    whatsappNumber: newWhatsapp,
                                    gender: gender,
                                    instituteCategory: "",
                                    isAgreeTnc: "Y",
                                    landlineNumber: newLandLine,
                                    alternativeNumber: newAlternativeNum,
                                    address1: Addressline1,
                                    address2: Addressline2,
                                };
                                //console.log("profilePayLoad", profilePayLoad);
                                axios.post("http://localhost:8080/api/profile", profilePayLoad)
                                    .then((profileRes) => {
                                        //console.log("profile created", profileRes);
                                        if (profileRes.statusText == "OK") {
                                            const personalInfoPayload = {
                                                userid: userRes?.data?.data?.id,
                                                relationwithstudent: relationwithstudent,
                                                dateofbirth: dob,
                                                studyingin: studingin,
                                                board: board,
                                                institutename: nameOfInstitute,
                                                institutelocation: locationInstitute
                                            }
                                            //console.log("personalInfoPayload", personalInfoPayload);
                                            axios.post("http://localhost:8080/api/studentpersonalinfo", personalInfoPayload)
                                                .then((personalRes) => {
                                                    //console.log("Personal info created", personalRes);
                                                    if (personalRes.statusText == "OK") {
                                                        const addressPayload = [
                                                            {
                                                                userid: userRes?.data?.data?.id,
                                                                addressline1: Addressline1,
                                                                addressline2: Addressline2,
                                                                landmark: landmark,
                                                                city: address1?.Division,
                                                                state: address1?.State,
                                                                country: address1?.Country,
                                                                pin: address1?.Pincode,
                                                                addressType: addressType[0]?.listItemId,
                                                                isSameAddress: ""
                                                            }
                                                        ]
                                                        //console.log("addressPayload", addressPayload);
                                                        axios.post("http://localhost:8080/api/address", addressPayload)
                                                            .then((addressRes) => {
                                                                //console.log("address created", addressRes);
                                                                if (addressRes.statusText == "OK") {
                                                                    const studentLevelPayload = storedData[0]
                                                                    studentLevelPayload.userid = userRes?.data?.data?.id
                                                                    //console.log("studentLevelPayload", studentLevelPayload);
                                                                    axios.post("http://localhost:8080/api/studentlevel", studentLevelPayload)
                                                                        .then((studentRes) => {
                                                                            //console.log("studentlevel created", studentRes);
                                                                            if (studentRes.statusText == "OK") {
                                                                                const studentSubjectPayload = storedData[1];
                                                                                studentSubjectPayload.userid = userRes?.data?.data?.id
                                                                                //console.log("studentSubjectPayload", studentSubjectPayload);

                                                                                axios.post("http://localhost:8080/api/teachersubject/studentSubject", studentSubjectPayload)
                                                                                    .then((subRes) => {
                                                                                        //console.log("subject created", subRes);
                                                                                        if (subRes.statusText == "OK") {
                                                                                            Swal.fire({
                                                                                                position: 'center',
                                                                                                icon: 'success',
                                                                                                title: 'Your details has been saved successfully',
                                                                                                showConfirmButton: false,
                                                                                                timer: 1500
                                                                                            })
                                                                                            localStorage.clear();
                                                                                             
                               

                                                                                            const userStore = {
                                                                                                email,
                                                                                                primaryMob: localMobile,
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
                                                                                            setStep(2)
                                                                                            navigate("/request-tutor/verification");

                                                                                        }
                                                                                    })
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                    }
                                                })
                                        }

                                    })
                            }
                        })
                        .catch((error) => {
                            console.error("User create error", error)
                        })

                }
            })
    }

    //console.log("storedData", storedData);


    return (
        <form
            onSubmit={handleStudentContact}
            className="max-w-full border-2 shadow-md rounded-lg px-6 py-12 w-8/12 mx-auto"
        >
            <StudentPrimaryContact></StudentPrimaryContact>
            <StudentAddress
                handlePostalAddress={handlePostalAddress}
            ></StudentAddress>
            <StudentInformation
                setStudentDatOfBirth={setStudentDatOfBirth}
                setInstituteName={setInstituteName}
            ></StudentInformation>
            <ButtonSubmit alignValue="right"></ButtonSubmit>
        </form>
    );
};

export default RequestContactInformation;
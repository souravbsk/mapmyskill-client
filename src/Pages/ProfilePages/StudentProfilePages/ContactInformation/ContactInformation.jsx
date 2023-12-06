import React, { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import useAuthChanged from "../../../../Hooks/useAuthChanged";
import { useEffect } from "react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./ContactInformation.css";
import { TextField } from "@mui/material";
import LocationByPincode from "../../../../components/LocationByPincode/LocationByPincode";
import Swal from "sweetalert2";
import { FcOk } from "react-icons/fc";
import { IoIosCloseCircle } from "react-icons/io";
import StudentAddressDetails from "../../../../components/StudentAddressDetails/StudentAddressDetails";
import TeacherAddressDetails from "../../../../components/TeacherAddressDetails/TeacherAddressDetails";
import TeacherAddressEditForm from "./TeacherAddressEditForm/TeacherAddressEditForm";
import StudentAddressEditForm from "./StudentAddressEditForm/StudentAddressEditForm";

function ContactInformation() {
  const { user } = useAuthChanged();
  const [userDetails, setUserDetails] = useState([]);
  const [userDetailsTwo, setUserDetailsTwo] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [address, setAddress] = useState([]);
  const [postalAddress, setPostalAddress] = useState([]);
  const [postalAddressPermanent, setPostalAddressPermanent] = useState([]);

  const [refetch, setRefetch] = useState(false);
  const [teacherAddress, setTeacherAddress] = useState([]);

  // ======================User Info get start====================
  useEffect(() => {
    if (user?.userid) {
      axios
        .get(`http://localhost:8080/api/profile/byUserId/${user?.userid}`)
        .then((response) => {
          console.log(response,"hello world");
          setUserDetails(response.data)
          if (response.statusText == "OK") {
            axios
              .get(`http://localhost:8080/api/users/${user?.userid}`)
              .then((response) => {
                // console.log("user response",response);

                response?.data ? setUserDetailsTwo(response?.data) : null;
                if (response.statusText == "OK") {
                  axios
                    .get(`http://localhost:8080/api/address/${user?.userid}`)
                    .then((response) => {
                      if (user?.roleid == 3) {
                        setTeacherAddress(response?.data?.data);
                      } else {
                        response?.data
                          ? setAddress(response?.data?.data[0])
                          : null;
                      }

                      // console.log("address", response.data.data[0]);
                    });
                }
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching segments:", error);
        });
    }
  }, [user, refetch]);
  // ======================User Info get end====================



  const handlePostalAddress = (value) => {
    value ? setPostalAddress(value) : null;
  };

  const handlePostaladdressPremanent = (value) => {
    value ? setPostalAddressPermanent(value) : null;
  };
// console.log("postalAddressPermanentaaaaa", postalAddressPermanent);

  console.log("userDetailsTwo testing", userDetails);

  return (
    <div className="">
      {showForm ? (
        <div>
          <div className="p-4 border-b-2 text-lg font-semibold bg-[#040936] flex justify-between ">
            <p className="text-white"> Contact Information</p>
            <div
              onClick={() => setShowForm(!true)}
              className="p-1 hover:cursor-pointer hover:text-blue-500"
            >
              <EditNoteIcon className="text-white" />
              <span className="text-sm text-white">Edit</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-6 bg-white border-b-2">
            <div className="flex">
              <label className="font-semibold w-48">Mobile:</label>
              <label className="flex items-center gap-2">
                ({userDetailsTwo[0]?.isdcode}) {userDetailsTwo[0]?.mobile}{" "}
                <p>
                  {userDetails?.isContactVarified?.toLowerCase() == "y" ? (
                    <FcOk size={16}></FcOk>
                  ) : userDetails?.isContactVarified?.toLowerCase() == "n" ? (
                    <IoIosCloseCircle
                      size={16}
                      className="text-red-500"
                    ></IoIosCloseCircle>
                  ) : null}
                </p>
              </label>
            </div>
            <div className="flex">
              <label className="font-semibold w-48">Email:</label>
              <label className="flex items-center gap-2">
                {userDetails?.emailId}
                <p>
                  {userDetails?.isEmailVarified?.toLowerCase() == "y" ? (
                    <FcOk size={16}></FcOk>
                  ) : userDetails?.isEmailVarified?.toLowerCase() == "n" ? (
                    <IoIosCloseCircle
                      size={16}
                      className="text-red-500"
                    ></IoIosCloseCircle>
                  ) : null}
                </p>
              </label>{" "}
            </div>
            <div className="flex">
              <label className="font-semibold w-48">Whatsapp Number:</label>
              <label>
                ({userDetailsTwo[0]?.isdcode}) {userDetails?.whatsappNumber}
              </label>
            </div>
            <div className="flex">
              <label className="font-semibold w-48">Landline Number:</label>
              <label>
                ({userDetailsTwo[0]?.isdcode}) {userDetails?.landlineNumber}
              </label>
            </div>
            <div className="flex">
              <label className="font-semibold w-48">Alternate Number:</label>
              <label>
                ({userDetailsTwo[0]?.isdcode}) {userDetails?.alternativeNumber}
              </label>
            </div>
          </div>
          {user?.roleid == 3 ? (
            <TeacherAddressDetails
              teacherDetails={teacherAddress}
            ></TeacherAddressDetails>
          ) : user?.roleid == 4 ? (
            <StudentAddressDetails address={address}></StudentAddressDetails>
          ) : null}
        </div>
      ) : (
        // =======================Edit Form Design start===============================
        <div>
          <div className="p-4 border-b-2 text-lg font-semibold bg-white flex justify-between  ">
            <div
              onClick={() => setShowForm(true)}
              className="p-1 hover:cursor-pointer hover:text-blue-500"
            >
              <span className="text-sm">Back</span>
            </div>
            <p>Edit Contact Information</p>
          </div>

          <div className="p-x-2 pt-4 pb-2 bg-white  border-b-2 mb-9">
            <div className="max-w-full w-full md:w-8/12 lg:ml-4 mx-auto text-center shadow-lg p-2 ">
              <div className="rounded-md bg-white p-3">
                {user?.roleid == 3 ? (
                  <TeacherAddressEditForm
                  userDetails={userDetails}
                  teacherAddress={teacherAddress}
                  handlePostalAddress={handlePostalAddress}
                  address={address}
                  userDetailsTwo={userDetailsTwo}
                  postalAddress={postalAddress}
                  postalAddressPermanent={postalAddressPermanent}
                  handlePostaladdressPremanent={handlePostaladdressPremanent}


                  
                  ></TeacherAddressEditForm>
                ) : user?.roleid == 4 ? (
                  <StudentAddressEditForm
                    userDetailsTwo={userDetailsTwo}
                    userDetails={userDetails}
                    handlePostalAddress={handlePostalAddress}
                    address={address}
                    refetch={refetch}
                    setRefetch={setRefetch}
                    postalAddress={postalAddress}
                   
                  ></StudentAddressEditForm>
                ) : null}

                {/* <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                    <div className="md:col-span-1 phone-input">
                      <label className="float-left block  font-normal text-black text-lg">
                        Mobile
                      </label>
                      <PhoneInput
                        PhoneInput
                        country={"in"}
                        specialLabel=""
                        value={
                          userDetailsTwo[0]?.isdcode + userDetailsTwo[0]?.mobile
                        }
                        inputProps={{
                          name: "mobileNum",
                          required: true,
                          autoFocus: true,
                        }}
                      ></PhoneInput>
                    </div>

                    <div className="md:col-span-1">
                      <label className="float-left block  font-normal text-black text-lg">
                        Email Id
                      </label>
                      <input
                        defaultValue={userDetails?.emailId}
                        type="email"
                        name="email"
                        placeholder="Enter email id *"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 "
                      />{" "}
                    </div>

                    <div className="md:col-span-1 phone-input">
                      <label className="float-left block  font-normal text-black text-lg">
                        Whatsapp number
                      </label>
                      <PhoneInput
                        PhoneInput
                        country={"in"}
                        specialLabel=""
                        value={
                          userDetailsTwo[0]?.isdcode +
                          userDetails?.whatsappNumber
                        }
                        inputProps={{
                          name: "whatsappNum",
                          required: true,
                          autoFocus: true,
                        }}
                      ></PhoneInput>
                    </div>

                    <div className="md:col-span-1 phone-input">
                      <label className="float-left block  font-normal text-black text-lg">
                        Landline number
                      </label>
                      <PhoneInput
                        PhoneInput
                        country={"in"}
                        specialLabel=""
                        value={
                          userDetailsTwo[0]?.isdcode +
                          userDetails?.landlineNumber
                        }
                        inputProps={{
                          name: "landlineNum",
                          required: true,
                          autoFocus: true,
                        }}
                      ></PhoneInput>
                    </div>

                    <div className="md:col-span-1 phone-input">
                      <label className="float-left block  font-normal text-black text-lg">
                        Alternate number
                      </label>
                      <PhoneInput
                        PhoneInput
                        country={"in"}
                        specialLabel=""
                        value={
                          userDetailsTwo[0]?.isdcode +
                          userDetails?.alternativeNumber
                        }
                        inputProps={{
                          name: "alternateNum",
                          required: true,
                          autoFocus: true,
                        }}
                      ></PhoneInput>
                    </div>

                    <div className="md:col-span-2 flex flex-col">
                      <label className="float-left block text-left font-normal text-black text-lg">
                        Address Line 1
                      </label>
                      <LocationByPincode
                        locationFieldName="contactUpdateAddress1"
                        defaultValue={userDetails?.address1}
                        instituteLocation={handlePostalAddress}
                      ></LocationByPincode>
                    </div>

                    <div className="md:col-span-2">
                      <label className="float-left block  font-normal text-black text-lg">
                        Address Line 2
                      </label>
                      <TextField
                        type="text"
                        id="standard-basic"
                        required
                        placeholder="Enter address line 2"
                        variant="standard"
                        className="data_container w-full"
                        defaultValue={userDetails?.address2}
                        name="contactUpdateAddress2"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="float-left block  font-normal text-black text-lg">
                        Landmark
                      </label>
                      <TextField
                        type="text"
                        id="standard-basic"
                        required
                        placeholder="Enter Land mark"
                        variant="standard"
                        className="data_container w-full"
                        defaultValue={address?.landmark}
                        name="landmark"
                      />
                    </div>


                    {user?.roleid == 3 ? (
                      <TeacherAddressEditForm
                        userDetails={userDetails}
                        teacherAddress={teacherAddress}
                        handlePostalAddress={handlePostalAddress}

                      ></TeacherAddressEditForm>
                    ) : null
                    }



                    <div className=" md:col-span-2 text-right">
                      <button className="outline-none w-36 py-3 text-base font-medium rounded text-white bg-[#0EA5E9] hover:bg-[#37728b] transition duration-300">
                        Save
                      </button>
                    </div>
                  </div>
                </form> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactInformation;

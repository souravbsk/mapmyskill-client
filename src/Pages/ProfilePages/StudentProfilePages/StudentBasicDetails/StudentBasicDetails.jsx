import React, { useEffect, useState } from "react";
import img from "../../../../../src/assets/images/profile.png";
import EditNoteIcon from "@mui/icons-material/EditNote";
import useAuthChanged from "../../../../Hooks/useAuthChanged";
import axios from "axios";
import useFetchValue from "../../../../Hooks/useFetchValue";
import moment from "moment";
import Swal from "sweetalert2";
import UploadButton from "../../../../components/UploadButton/UploadButton";
import { Avatar } from "@mui/material";
import UserProfileImageUpload from "../../../../components/UserProfileImageUpload/UserProfileImageUpload";

function StudentBasicDetails() {
  const { user } = useAuthChanged();
  const { getValue: gender } = useFetchValue("Gender");
  const [refetch, setRefetch] = useState(false);

  const [userDetails, setUserDetails] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const [dob, setDob] = useState("");
  const DOB = moment(dob);
  const formattedDob = DOB.format("YYYY-MM-DD");

  const [Profile, setProfile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // ======================User Info get start====================
  useEffect(() => {
    if (user?.userid) {
      axios
        .get(`http://localhost:8080/api/profile/byUserId/${user?.userid}`)
        .then((response) => {
          if (response?.data) {
            // console.log(response?.data);
            setUserDetails(response.data);
            if (response.statusText == "OK") {
              axios
                .get(
                  `http://localhost:8080/api/studentpersonalinfo/${user?.userid}`
                )
                .then((response) => {
                  if (response?.data) {
                    // console.log(response?.data);
                    setDob(response.data.data.dateofbirth);
                    // setUserDetails(response?.data);
                  }
                });
            }
            // setUserDetails(response?.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching User Info:", error);
        });
    }
  }, [user, refetch]);

  const city = userDetails.address1;
  let cityName = "";
  if (city && typeof city === "string") {
    const parts = city.split(",");
    if (parts.length > 1) {
      cityName = parts[1].trim();
    }
  }
  const fullName = userDetails?.poc;
  const [fName, lName] = fullName ? fullName.split(" ") : ["", ""];
  // ======================User Info get end====================

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const fName = form.fname.value;
    const lName = form.lname.value;
    const gender = form.Gender.value;
    const dob = form.Dob.value;

    const profilePayload = {
      poc: fName + " " + lName,
      gender: gender,
    };

    const personalInfoPayload = {
      dateofbirth: dob,
    };

    if (user) {
      Swal.fire({
        title: "Are you sure?",
        text: "do you want to update!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Update it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(
              `http://localhost:8080/api/profile/${user?.userid}`,
              profilePayload
            )
            .then((response) => {
              if (response.statusText == "OK") {
                axios
                  .put(
                    `http://localhost:8080/api/studentpersonalinfo/${user?.userid}`,
                    personalInfoPayload
                  )
                  .then((response) => {
                    if (response.statusText == "OK") {
                      Swal.fire(
                        "Updated!",
                        "Your Information has been updated.",
                        "success"
                      );
                      setRefetch(!refetch);
                    }
                  });
              }
            })
            .catch((error) => {
              console.error("Profile update error", error);
            });
        }
      });
    }
  };

  console.log(userDetails);

  return (
    <div className="">
      {showForm ? (
        <div>
          <div className="p-4 border-b-2 text-lg font-semibold bg-white flex justify-between ">
            <p> Personal Information</p>
            <div
              onClick={() => setShowForm(!true)}
              className="p-1 hover:cursor-pointer hover:text-blue-500"
            >
              <EditNoteIcon />
              <span className="text-sm">Edit</span>
            </div>
          </div>
          <div className="flex gap-7 p-6 bg-white  border-b-2 mb-9">
            <div className="">
              <UserProfileImageUpload
                userDetails={userDetails}
                refetch={refetch}
                setRefetch={setRefetch}
              ></UserProfileImageUpload>
            </div>

            <div className=" p-4">
              <div className="flex gap-4 pb-3">
                <h1 className="text-lg font-bold">{userDetails.poc}</h1>
                <span className="text-sm font-normal text-blue-500 mt-1 hover:cursor-pointer hover:text-red-600">
                  view public profile
                </span>
              </div>
              <div>
                <div>
                  <div className="flex">
                    <label className="font-semibold w-48">Gender:</label>
                    <label>{userDetails.listItemName}</label>
                  </div>
                  <div className="flex">
                    <label className="font-semibold w-48">Date of Birth:</label>
                    <label>{formattedDob}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            <p>Edit Personal Information</p>
          </div>

          <div className="p-x-2 pt-4 pb-2 bg-white border-b-2 mb-9">
            <div className="max-w-lg lg:ml-4  shadow-lg p-2 ">
              <div className="rounded-md p-3">
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                    <div className="md:col-span-1">
                      <label
                        for="subject"
                        className="float-left block  font-normal text-black text-lg"
                      >
                        First Name
                      </label>
                      <input
                        defaultValue={fName}
                        type="text"
                        name="fname"
                        placeholder="First Name *"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 "
                      />
                    </div>

                    <div className="md:col-span-1">
                      <label
                        for="subject"
                        className="float-left block  font-normal text-black text-lg"
                      >
                        Last Name
                      </label>
                      <input
                        defaultValue={lName}
                        type="text"
                        name="lname"
                        placeholder="Last Name *"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 "
                      />
                    </div>

                    <div className="md:col-span-1">
                      <label
                        for="subject"
                        className="float-left block  font-normal text-black text-lg"
                      >
                        Gender
                      </label>
                      <select
                        defaultValue={userDetails.gender}
                        id="subject"
                        name="Gender"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                      >
                        {gender.map((items) => (
                          <option
                            key={items.listItemId}
                            value={items.listItemId}
                          >
                            {items.listItemName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-1">
                      <label
                        for="dob"
                        className="float-left block  font-normal text-black text-lg"
                      >
                        Date of birth
                      </label>
                      <input
                        defaultValue={formattedDob}
                        type="date"
                        id="dob"
                        name="Dob"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                      />
                    </div>

                    <div className=" md:col-span-2 text-right">
                      <button className="outline-none w-36 py-3 text-base font-medium rounded text-white bg-[#0EA5E9] hover:bg-[#37728b] transition duration-300">
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentBasicDetails;

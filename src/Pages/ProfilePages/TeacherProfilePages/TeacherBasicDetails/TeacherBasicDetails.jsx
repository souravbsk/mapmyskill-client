import React from "react";
import TutoringDetails from "../../../../components/DashbordComponents/TutoringDetails/TutoringDetails";
import TuitionSchedule from "../../../../components/DashbordComponents/TuitionSchedule/TuitionSchedule";
import Teaches from "../../../../components/DashbordComponents/Teaches/Teaches";
import OnlineTuition from "../../../../components/DashbordComponents/OnlineTuition/OnlineTuition";
import OnlinePresence from "../../../../components/DashbordComponents/OnlinePresence/OnlinePresence";
import useAuthChanged from "../../../../Hooks/useAuthChanged";
import EditNoteIcon from "@mui/icons-material/EditNote";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import useFetchValue from "../../../../Hooks/useFetchValue";
import Swal from "sweetalert2";
import UserProfileImageUpload from "../../../../components/UserProfileImageUpload/UserProfileImageUpload";

function TeacherBasicDetails() {
  const [showForm, setShowForm] = useState(true);
  const { user } = useAuthChanged();
  const [userDetails, setUserDetails] = useState([]);
  const { getValue: gender } = useFetchValue("Gender");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [refetch, setRefetch] = useState(true);

  const [dob, setDob] = useState("");

  useEffect(() => {
    if (user?.userid) {
      axios
        .get(`http://localhost:8080/api/profile/byUserId/${user?.userid}`)
        .then((response) => {
          if (response?.data) {
            //console.log("hello world", response?.data);

            const fullName = response?.data?.poc;
            const splitName = fullName?.split(" ");
            setFirstName(splitName[0]);
            setLastName(splitName[1]);

            setUserDetails(response.data);
            if (response.statusText == "OK") {
              axios
                .get(
                  `http://localhost:8080/api/personalinfo/byUserId/${user?.userid}`
                )
                .then((res) => {
                  //console.log(res);
                  if (res?.data) {
                    // console.log(response?.data);
                    //console.log("response", res.data);
                    setDob(res.data.dateofbirth);
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

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.fname.value;
    const lastName = form.lname.value;
    const dob = form.dob.value;
    const fullName = firstName + " " + lastName;
    const gender = form.Gender.value;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be update this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const profilePayload = {
          poc: fullName,
          gender: gender,
        };

        axios
          .put(
            `http://localhost:8080/api/profile/${user?.userid}`,
            profilePayload
          )
          .then((response) => {
            //console.log(response);
            if (response?.data?.success) {
              const personalInfoPayload = {
                dateofbirth: dob,
              };
              //console.log(personalInfoPayload);
              axios
                .put(
                  `http://localhost:8080/api/personalinfo/${user?.userid}`,
                  personalInfoPayload
                )
                .then((res) => {
                  if (res.data) {
                    Swal.fire(
                      "Updated!",
                      "Your information has been updated.",
                      "success"
                    );
                    setRefetch(!refetch);
                  }
                });
            }
          });
        //
      }
    });
  };

  return (
    <div>
      <div className="">
        {showForm ? (
          <div className="shadow-lg">
            <div className="p-4 border-b-2 text-lg font-semibold bg-[#040936] flex justify-between ">
              <p className="text-white text-xl"> Personal Information</p>
              <div
                onClick={() => setShowForm(!showForm)}
                className="p-1 hover:cursor-pointer hover:text-blue-500"
              >
                <EditNoteIcon />
                <span className="text-sm">Edit</span>
              </div>
            </div>
            <div className="flex gap-10 md:flex-col lg:flex-row sm:flex-col p-6 bg-white  border-b-2 mb-9">
              <div className="flex flex-col justify-center items-center gap-2 pl-8">
                <UserProfileImageUpload
                  userDetails={userDetails}
                  refetch={refetch}
                  setRefetch={setRefetch}

                ></UserProfileImageUpload>
              </div>
              <div className=" p-4 bg-[#ACC8E5] w-[700px] shadow-xl">
                <div className="flex gap-4 pb-3">
                  <h1 className="text-lg font-bold">{userDetails?.poc}</h1>
                  <span className="text-sm font-normal text-blue-500 mt-1 hover:cursor-pointer hover:text-red-600">
                    view public profile
                  </span>
                </div>
                <div>
                  <div>
                    <div className="flex">
                      <label className="font-semibold w-48">Gender:</label>
                      <label>{userDetails?.listItemName}</label>
                    </div>
                    <div className="flex">
                      <label className="font-semibold w-48">
                        Date of Birth:
                      </label>
                      <label>{moment(dob)?.format("YYYY-MM-DD")}</label>
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

            <div className="p-x-2 pt-4 pb-2 bg-white  border-b-2 mb-9">
              <div className="max-w-full w-full md:w-8/12  mx-auto text-center shadow-lg p-2 ">
                <div className="rounded-md bg-gray-200 p-3">
                  <form onSubmit={handleUpdateSubmit}>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                      <div className="md:col-span-1">
                        <label
                          for="subject"
                          className="float-left block  font-normal text-black text-lg"
                        >
                          First Name
                        </label>
                        <input
                          defaultValue={firstName}
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
                          defaultValue={lastName}
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
                          defaultValue={userDetails?.gender}
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
                          defaultValue={moment(dob)?.format("YYYY-MM-DD")}
                          type="date"
                          id="dob"
                          name="dob"
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

      {/* <TutoringDetails></TutoringDetails>
      <TuitionSchedule></TuitionSchedule>
      <Teaches></Teaches>
      <OnlineTuition></OnlineTuition>
      <OnlinePresence></OnlinePresence> */}
    </div>
  );
}

export default TeacherBasicDetails;

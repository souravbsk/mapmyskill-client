import React from "react";
import PhoneInput from "react-phone-input-2";
import LocationByPincode from "../../../../../components/LocationByPincode/LocationByPincode";
import { TextField } from "@mui/material";
import useAuthChanged from "../../../../../Hooks/useAuthChanged";
import Swal from "sweetalert2";
import axios from "axios";

const StudentAddressEditForm = ({
  userDetailsTwo,
  userDetails,
  handlePostalAddress,
  address,
  refetch,
  setRefetch,
  postalAddress

}) => {
  const { user } = useAuthChanged();


  const numberCracker = (phoneNumber) => {
    const numberArray = phoneNumber.split(" ");
    const isdcode = numberArray[0];
    const number = numberArray[1]?.replace(/[-+]/g, "");
    return { number, isdcode };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const mobile = form.mobileNum.value;
    const email = form.email.value;
    const whatsapp = form.whatsappNum.value;
    const alternate = form.alternateNum.value;
    const landline = form.landlineNum.value;
    const address1 = form.contactUpdateAddress1.value;
    const address2 = form.contactUpdateAddress2.value;
    const landmark = form.landmark.value;



    //profile user contact number verify,

    const { isdcode, number: phoneNumber } = numberCracker(mobile);
    const { number: whatsappNumber } = numberCracker(whatsapp);
    const { number: alterNativeNumber } = numberCracker(alternate);
    const { number: landlineNumber } = numberCracker(landline);

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Email",
      });
      return;
    }

    // is email match
    let isEmailVerify;

    if (userDetails?.emailId === email) {
      isEmailVerify = "Y";
    } else {
      isEmailVerify = "N";
    }

    let isPhoneVerify;
    // is mobile number match
    //console.log(userDetailsTwo?.mobile, phoneNumber);
    //console.log(userDetailsTwo?.mobile === phoneNumber);
    if (userDetailsTwo?.mobile === phoneNumber) {
      isPhoneVerify = "Y";
    } else {
      isPhoneVerify = "N";
    }

    const phonePattern = /^\d{10}$/;

    if (
      !phonePattern.test(
        phoneNumber || whatsappNumber || alterNativeNumber || landlineNumber
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid alternative Number",
      });
      return;
    }

    if (user) {
      //console.log(user);
      const userPayload = {
        isdcode,
        email,
        mobile: phoneNumber,
      };

      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to update ?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(
              `http://localhost:8080/api/users/updateByUserId/${user.userid}`,
              userPayload
            )
            .then((res) => {
              if (res?.data?.success) {
                const profilePayload = {
                  emailId: email,
                  isEmailVarified: isEmailVerify,
                  primaryContact: phoneNumber,
                  isContactVarified: isPhoneVerify,
                  whatsappNumber: whatsappNumber,
                  landlineNumber: landlineNumber,
                  alternativeNumber: alterNativeNumber,
                  address1: address1,
                  address2: address2,
                };
                axios
                  .put(
                    `http://localhost:8080/api/profile/${user.userid}`,
                    profilePayload
                  )
                  .then((res) => {
                    if (res.data.success) {
                      const addressPayload = {
                        addressline1: address1,
                        addressline2: address2,
                        landmark: landmark,
                        city: postalAddress?.Division,
                        state: postalAddress?.State,
                        country: postalAddress?.Country,
                        pin: postalAddress?.Pincode,
                      };
                      axios
                        .put(
                          `http://localhost:8080/api/address/updateByUserId/${user.userid}`,
                          addressPayload
                        )
                        .then((response) => {
                          Swal.fire(
                            "Updated!",
                            "Your details has been updated.",
                            "success"
                          );
                          setRefetch(!refetch);
                        });
                    }
                  });
              }
            });
        }
      });
    }

  };

  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
          <div className="md:col-span-1 phone-input">
            <label className="float-left block  font-normal text-black text-lg">
              Mobile
            </label>
            <PhoneInput
              PhoneInput
              country={"in"}
              specialLabel=""
              value={userDetailsTwo[0]?.isdcode + userDetailsTwo[0]?.mobile}
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
              value={userDetailsTwo[0]?.isdcode + userDetails?.whatsappNumber}
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
              value={userDetailsTwo[0]?.isdcode + userDetails?.landlineNumber}
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
                userDetailsTwo[0]?.isdcode + userDetails?.alternativeNumber
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

          <div className=" md:col-span-2 text-right">
            <button className="outline-none w-36 py-3 text-base font-medium rounded text-white bg-[#0EA5E9] hover:bg-[#37728b] transition duration-300">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StudentAddressEditForm;

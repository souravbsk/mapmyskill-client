import React from "react";
import LocationByPincode from "../../../../../components/LocationByPincode/LocationByPincode";
import { TextField } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import UpdatePermanentAddress from "./UpdatePermanentAddress/UpdatePermanentAddress";
import UpdatePresentAddress from "./UpdatePresentAddress/UpdatePresentAddress";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuthChanged from "../../../../../Hooks/useAuthChanged";
import useFetchValue from "../../../../../Hooks/useFetchValue";
import axios from "axios";

function TeacherAddressEditForm({
  userDetails,
  teacherAddress,
  handlePostalAddress,
  address,
  userDetailsTwo,
  postalAddress,
  postalAddressPermanent,
  handlePostaladdressPremanent,
}) {
  const [isPermanentddress, setPermanentddress] = useState(
    teacherAddress[0]?.isSameAddress || "y"
  );
  const { getValue: addressType } = useFetchValue("addressType");

  const { user } = useAuthChanged();

  console.log("postalAddressPermanent", postalAddressPermanent);

  const numberCracker = (phoneNumber) => {
    const numberArray = phoneNumber.split(" ");
    const isdcode = numberArray[0];
    const number = numberArray[1]?.replace(/[-+]/g, "");
    return { number, isdcode };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const mobile = form?.mobileNum?.value;
    const email = form?.email?.value;
    const whatsapp = form?.whatsappNum?.value;
    const alternate = form?.alternateNum?.value;
    const landline = form?.landlineNum?.value;
    const address1 = form?.contactUpdateAddress1?.value;
    const address2 = form?.contactUpdateAddress2?.value;
    const landmark = form?.landmark?.value;

    const Paddress1 = form?.PcontactUpdateAddress1?.value;
    const Paddress2 = form?.PcontactUpdateAddress2?.value;
    const Plandmark = form?.Plandmark?.value;

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

    const userPayload = {};

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

      // const permanentAddressPayload = {
      //   userid:user?.userid,
      //   addressline1: Paddress1,
      //   addressline2: Paddress2,
      //   landmark: Plandmark,
      //   city: postalAddressPermanent?.Division,
      //   state: postalAddressPermanent?.State,
      //   country: postalAddressPermanent?.Country,
      //   pin: postalAddressPermanent?.Pincode,
      // };

      // const addressPayload = {
      //   addressline1: address1,
      //   addressline2: address2,
      //   landmark: landmark,
      //   city: postalAddress?.Division,
      //   state: postalAddress?.State,
      //   country: postalAddress?.Country,
      //   pin: postalAddress?.Pincode,
      // };
      const presentcity = postalAddress?.Division || teacherAddress[0]?.city;
      const presentstate = postalAddress?.State || teacherAddress[0]?.state;
      const presentpin = postalAddress?.Pincode || teacherAddress[0]?.pin;
      const presentcountry =
        postalAddress?.country || teacherAddress[0]?.country;

      const permanentcity =
        postalAddressPermanent?.Division || teacherAddress[1]?.city;
      const permanentstate =
        postalAddressPermanent?.State || teacherAddress[1]?.state;
      const permanentpin =
        postalAddressPermanent?.Pincode || teacherAddress[1]?.pin;
      const permanentcountry =
        postalAddressPermanent?.country || teacherAddress[1]?.country;

      const userAddress = [
        {
          userid: user?.userid,
          addressline1: address1,
          addressline2: address2,
          landmark: landmark,
          city: presentcity,
          state: presentstate,
          country: presentcountry,
          pin: presentpin,
          addressType: addressType[0]?.listItemId,
          isSameAddress: isPermanentddress,
        },
        isPermanentddress == "n"
          ? {
              userid: user?.userid,
              addressline1: Paddress1,
              addressline2: Paddress2,
              landmark: Plandmark,
              city: permanentcity,
              state: permanentstate,
              country: permanentcountry,
              pin: permanentpin,
              addressType: addressType[1]?.listItemId,
              isSameAddress: isPermanentddress,
            }
          : undefined, // Set to undefined if isSameAddress is "Yes"
      ].filter(Boolean);

      console.log("teacherAddress", teacherAddress);

      console.log("userAddress", userAddress);

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
                      axios
                        .delete(
                          `http://localhost:8080/api/address/${user.userid}`
                        )
                        .then((deleteres) => {
                          if (deleteres?.data?.success) {
                            axios
                              .post(
                                `http://localhost:8080/api/address`,
                                userAddress
                              )
                              .then((res) => {
                                if (res?.data?.success) {
                                  Swal.fire(
                                    "Updated!",
                                    "Your details has been updated.",
                                    "success"
                                  );
                                }
                              });
                          }
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
        </div>

        <div className="">
          <div className="flex items-center gap-5">
            <span>Is your address is permanent which is shown below ?</span>
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

        <div>
          <UpdatePresentAddress
            handlePostalAddress={handlePostalAddress}
            address={address}
            isPermanentddress={isPermanentddress}
            teacherAddress={teacherAddress}
          ></UpdatePresentAddress>
        </div>

        <div>
          <UpdatePermanentAddress
            handlePostalAddress={handlePostalAddress}
            address={address}
            isPermanentddress={isPermanentddress}
            teacherAddress={teacherAddress}
            postalAddressPermanent={postalAddressPermanent}
            handlePostaladdressPremanent={handlePostaladdressPremanent}
          ></UpdatePermanentAddress>
        </div>

        <div className=" md:col-span-2 text-right mt-3">
          <button className="outline-none w-36 py-3 text-base font-medium rounded text-white bg-[#0EA5E9] hover:bg-[#37728b] transition duration-300">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default TeacherAddressEditForm;

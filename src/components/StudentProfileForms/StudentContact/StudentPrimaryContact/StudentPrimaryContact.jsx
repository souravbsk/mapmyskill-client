import { TextField } from "@mui/material";
import React from "react";
import PhoneInput from "react-phone-input-2";

const StudentPrimaryContact = ({ userInfo }) => {
  const userPrimaryContact = "91" + userInfo?.primaryContact;
  //console.log(userInfo);

  return (
    <div>
      <h6 className="text-xl mb-4 font-medium">Contact Information</h6>

      <div className="flex items-center w-full gap-6 mb-6">
        <div className="w-full">
          <label className="">Primary contact no.</label>
          <PhoneInput
            inputProps={{
              name: "mobile",
              required: true,
              autoFocus: true,
              readOnly: true,
              pointerEvents: "none",
              className:
                "border-[#909090]   ps-16 outline-none border-t-0 border-r-0 border-l-0 text-lg border-none  w-full rounded-lg border-[#1976D2] w-full py-1 rounded-none ",
            }}
            value={userPrimaryContact}
            placeholder="Enter Mobile"
            specialLabel=""
            className="border mt-4 hover:border-b-2 hover:border-black  border-[#909090] w-full outline-none border-t-0 border-r-0 border-l-0 rounded "
            country={"in"}
            onlyCountries={["in"]}
          ></PhoneInput>
        </div>
        <div className="w-full">
          <label>Alternative contact no.</label>
          <PhoneInput
            inputProps={{
              name: "alternativephoneNumber",
              required: true,
              autoFocus: true,

              className:
                "border-[#909090]  ps-16 outline-none border-t-0 border-r-0 border-l-0 text-lg border-none  w-full rounded-lg border-[#1976D2] w-full py-1 rounded-none ",
            }}
            placeholder="Enter Mobile"
            specialLabel=""
            className="border mt-4 hover:border-b-2 hover:border-black  border-[#909090] w-full outline-none border-t-0 border-r-0 border-l-0 rounded "
            country={"in"}
            onlyCountries={["in"]}
          />
        </div>
      </div>

      <div className="flex items-center w-full gap-6 mb-6">
        <div className="w-full">
          <label>Land line No.</label>
          <PhoneInput
            inputProps={{
              name: "landLinePhoneNumber",
              required: true,
              autoFocus: true,

              className:
                "border-[#909090]  ps-16 outline-none border-t-0 border-r-0 border-l-0 text-lg border-none  w-full rounded-lg border-[#1976D2] w-full py-1 rounded-none ",
            }}
            placeholder="Enter Mobile"
            specialLabel=""
            className="border mt-4 hover:border-b-2 hover:border-black  border-[#909090] w-full outline-none border-t-0 border-r-0 border-l-0 rounded "
            country={"in"}
            onlyCountries={["in"]}
          />
        </div>
        <div className="w-full">
          <label>What App No.</label>

          <TextField
            type="text"
            required
            variant="standard"
            className="data_container w-full"
            name="whatsappnumber"
            readOnly
            value={userInfo?.whatsappNumber}
          />
        </div>
      </div>
      <div className="input-container">
        <div className="input-holder">
          <label>Email ID</label>

          <TextField
            size="small"
            fullWidth
            type="email"
            name="email"
            variant="standard"
            value={userInfo?.emailId}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default StudentPrimaryContact;

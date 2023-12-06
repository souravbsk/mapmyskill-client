import { TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const PresentAddress = ({ userInfo,presentAddressDetails,setPresentAddressDetails }) => {
 

  // Check if userInfo and userInfo.address1 are defined
  const presentAddress1 = userInfo?.address1 || "";
  const addressParts = presentAddress1.split(",");
  // Check if there are at least 3 parts in the split result
  const presentPincode = addressParts.length >= 3 ? addressParts[2].trim() : "";

  useEffect(() => {
    if (presentPincode.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${presentPincode}`)
        .then((res) => res.json())
        .then((data) => {
          if (data[0].Status == "Success") {
            const PostOffice = data[0].PostOffice;
            const actualOffice = PostOffice.find(
              (item) =>
                item.Name.toLowerCase() ==
                  addressParts[0].trim().toLowerCase() &&
                item.Division.toLowerCase() ==
                  addressParts[1].trim().toLowerCase() &&
                item.Pincode == addressParts[2].trim()
            );


            if (actualOffice) {
              setPresentAddressDetails({
                ...presentAddressDetails,
                city:actualOffice?.Division,
                state: actualOffice?.State,
                country: actualOffice?.Country,
                pin: actualOffice?.Pincode,
              });
            }
          }
        });
    }
  }, [presentPincode]);

  return (
    <div className="my-6 ">
      <h6 className="text-xl font-medium">Present Address</h6>
      <div className=" flex items-center gap-6 mt-4 mb-6">
        <div className="w-full">
          <label>Address Line 1</label>

          <TextField
            size="small"
            fullWidth
            label=""
            name="presentAddressLine1"
            variant="standard"
            value={userInfo?.address1}
            readOnly
          />
        </div>
        <div className="w-full">
          <label>Address Line 2</label>

          <TextField
            size="small"
            fullWidth
            label=""
            name="presentAddressLine2"
            variant="standard"
            value={userInfo?.address2}
            readOnly
          />
        </div>
      </div>

      <div className="input-container">
        <div className="input-holder">
          <TextField
            size="small"
            fullWidth
            label="Landmark"
            name="presentAddressLandmark"
            variant="standard"
          />
        </div>
      </div>
    </div>
  );
};

export default PresentAddress;

import { TextField } from "@mui/material";
import React, { useState } from "react";
import LocationByPincode from "../../../LocationByPincode/LocationByPincode";

const PermanentAddress = ({ isPermanentddress, setPermanentddress, setPermanentAddressDetails, permanentAddressDetails }) => {

  const handlePermanentAddressLine = (permanentAddress) => {
    console.log("permanent============>", permanentAddress);

    if (permanentAddress) {
      setPermanentAddressDetails({
        ...permanentAddressDetails,
        city: permanentAddress?.Division,
        state: permanentAddress?.State,
        country: permanentAddress?.Country,
        pin: permanentAddress?.Pincode,
      });
    }
  };
  return (
    <div className="my-6 ">
      {isPermanentddress == "n" ? (
        <div>
          <h6 className="text-xl font-medium">Permanent Address</h6>

          <div className="flex items-center gap-6 mb-6">
            <div className="w-full">
            <LocationByPincode
              locationFieldName="permanentAddressLine1"
              instituteLocation={handlePermanentAddressLine}
              label = "Address 1"
            ></LocationByPincode>

            </div>
            

            {/* permanentAddressLine1 */}

            <div
            className="w-full">
              <TextField
                size="small"
                fullWidth
                label="Address Line 2"
                variant="standard"
                name="permanentAddressLine2"
              />

            </div>
          </div>

          <div className="input-container">
            <div className="input-holder">
              <TextField
                size="small"
                fullWidth
                label="Landmark"
                variant="standard"
                name="permanentAddressLandmark"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PermanentAddress;

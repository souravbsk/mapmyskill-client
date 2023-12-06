import { TextField } from "@mui/material";
import React, { useEffect } from "react";

const StudentAddress = ({ userInfo, setStudentLocation, studentLocation }) => {
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
              setStudentLocation({
                ...studentLocation,
                city: actualOffice?.Division,
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
      <h6 className="text-xl font-medium">Address</h6>
      <div className=" flex items-center gap-6 mt-4 mb-6">
        <div className="w-full">
          <label>Address Line 1</label>
          <TextField
            size="small"
            fullWidth
            label=""
            name="Addressline1"
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
            name="Addressline2"
            value={userInfo?.address2}
            variant="standard"
            readOnly
          />
        </div>
      </div>

      <div className=" flex items-center gap-6 mt-4 mb-6">
        <div className="w-full">
          <label>Landmark</label>
          <TextField
            size="small"
            fullWidth
            label=""
            name="landmark"
            variant="standard"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default StudentAddress;

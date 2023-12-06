import { TextField } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./LocationByPincode.css";
const LocationByPincode = ({
  locationFieldName,
  instituteLocation,
  index,
  label,
  defaultValue,
  thirdParameter,
}) => {
  const [postalCode, setPostalCode] = useState(defaultValue || "");
  const [postCode, setPostCode] = useState("");
  const [postalAddress, setPostalAddress] = useState([]);

  useEffect(() => {
    if (postalCode.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${postalCode}`)
        .then((res) => res.json())
        .then((data) => {
          if (data[0].Status == "Success") {
            console.log("postal address", data[0]);
            setPostalAddress(data[0].PostOffice);
          }
        });
    }
  }, [postalCode]);

  const handleSetPostalValue = (e) => {
    setPostalCode(e.Name + ", " + e.Division + ", " + e.Pincode);
    setPostCode(e.Name + ", " + e.Division + ", " + e.Pincode);
    instituteLocation(e, index, thirdParameter);
  };

  return (
    <>
      <div className="flex items-center">
        <TextField
          value={postalCode}
          type="text"
          id="standard-basic"
          required
          label={label}
          defaultValue={"fsdfsd"}
          placeholder="Search by zip code"
          variant="standard"
          className="data_container w-full"
          name={locationFieldName}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </div>
      <ul
        className={
          postalCode.toString().split("").length === 6
            ? "list_disp absolute rounded text-black h-[200px] overflow-y-auto z-30 max-w-full bg-gray-200 space-y-2"
            : "list_hide"
        }
      >
        {postalCode.toString().split("").length === 6
          ? postalAddress.map((e) => (
              <li
                className="postallist hover:bg-[rgb(25,118,210)] hover:text-white p-2 rounded"
                key={e.Name}
                onClick={() => handleSetPostalValue(e)}
              >
                {e.Name + ", " + e.Division + ", " + e.Pincode}
              </li>
            ))
          : null}
      </ul>
    </>
  );
};

export default LocationByPincode;

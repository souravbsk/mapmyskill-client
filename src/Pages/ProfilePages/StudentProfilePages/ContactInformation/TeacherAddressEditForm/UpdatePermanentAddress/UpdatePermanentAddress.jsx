import React from "react";
import LocationByPincode from "../../../../../../components/LocationByPincode/LocationByPincode";
import { TextField } from "@mui/material";

function UpdatePermanentAddress({ handlePostalAddress,
   isPermanentddress,
    teacherAddress ,
     postalAddressPermanent,
     handlePostaladdressPremanent
    }) {

      

  // console.log("postalAddressPermanent", postalAddressPermanent);
  return (
    <>
      {isPermanentddress == "n" ? (
        <div>
          <h1 className="text-xl font-semibold text-left mb-3 ">Permanent address:</h1>

          <div className="md:col-span-2 flex flex-col">
            <label className="float-left block text-left font-normal text-black text-lg">
              Address Line 1
            </label>
            <LocationByPincode
              locationFieldName="PcontactUpdateAddress1"
              defaultValue={teacherAddress[1]?.addressline1}

              instituteLocation={handlePostaladdressPremanent}
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
              defaultValue={teacherAddress[1]?.addressline2}
              name="PcontactUpdateAddress2"
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
              defaultValue={teacherAddress[1]?.landmark}
              name="Plandmark"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default UpdatePermanentAddress;

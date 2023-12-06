import React from 'react'
import LocationByPincode from '../../../../../../components/LocationByPincode/LocationByPincode';
import { TextField } from '@mui/material';

function UpdatePresentAddress({handlePostalAddress, isPermanentddress, teacherAddress }) {
  return (
    <>
     

<div>
<h1 className="text-xl font-semibold text-left mb-3 ">Present address:</h1>
      <div className="md:col-span-2 flex flex-col">
        <label className="float-left block text-left font-normal text-black text-lg">
          Address Line 1
        </label>
        <LocationByPincode
          locationFieldName="contactUpdateAddress1"
          defaultValue={teacherAddress[0]?.addressline1}
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
          defaultValue={teacherAddress[0]?.addressline2}
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
          defaultValue={teacherAddress[0]?.landmark}
          name="landmark"
        />
      </div>
    </div>

     
    </>
  );
}

export default UpdatePresentAddress

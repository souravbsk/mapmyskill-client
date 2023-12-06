import React from "react";

const AddressDetails = ({ address }) => {
  return (
    <div>
      <div className="flex">
        <label className="font-semibold w-48">Address Type:</label>
        <label>{address?.address_type}</label>
      </div>
      <div className="flex">
        <label className="font-semibold w-48">Address Line 1 :</label>
        <label>{address?.addressline1}</label>
      </div>
      <div className="flex">
        <label className="font-semibold w-48">Address Line 2 :</label>
        <label>{address?.addressline2}</label>
      </div>
      <div className="flex">
        <label className="font-semibold w-48">Landmark:</label>
        <label>{address?.landmark}</label>
      </div>
      <div className="flex">
        <label className="font-semibold w-48">State:</label>
        <label>{address?.state}</label>
      </div>
      <div className="flex">
        <label className="font-semibold w-48">Country:</label>
        <label>{address?.country}</label>
      </div>
    </div>
  );
};

export default AddressDetails;

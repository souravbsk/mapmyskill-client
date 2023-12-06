import React from 'react';

const StudentAddressDetails = ({address}) => {
    return (
        <div className="flex flex-col gap-2 p-6 bg-white border-b-2 mb-9">
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

export default StudentAddressDetails;
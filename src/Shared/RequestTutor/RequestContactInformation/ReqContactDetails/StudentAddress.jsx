import { TextField } from '@mui/material';
import React, { useState } from 'react';
import LocationByPincode from '../../../../components/LocationByPincode/LocationByPincode';

const StudentAddress = ({ handlePostalAddress }) => {
    
    
    return (
        <div className="my-6 ">
            <h6 className="text-xl font-medium">Address</h6>
            <div className=" flex items-center gap-6 mt-4 mb-6">
                <div className="w-full">
                    <label>Address Line 1</label>
                    <LocationByPincode
                        locationFieldName="contactUpdateAddress1"
                        instituteLocation={handlePostalAddress}
                    ></LocationByPincode>
                </div>
                <div className="w-full">
                    <label>Address Line 2</label>
                    <TextField
                        size="small"
                        fullWidth
                        label=""
                        name="Addressline2"
                        variant="standard"
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
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentAddress;
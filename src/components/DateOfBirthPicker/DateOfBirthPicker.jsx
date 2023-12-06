import React, { useState } from 'react';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import moment from "moment/moment";

const DateOfBirthPicker = ({ setDateofBirth,defaultDate }) => {
  const handleDateChange = (value) => {
    const date = value.$d;
    const dateOfBirth = moment(date).format("YYYY-MM-DD");
    setDateofBirth(dateOfBirth)
  }

  return (
    <LocalizationProvider className="w-full" dateAdapter={AdapterDayjs}>
      <DemoContainer className="w-full" components={["DatePicker"]}>
        <DatePicker
          onChange={handleDateChange}
          className="w-full"
          label={defaultDate?moment(defaultDate).format("YYYY-MM-DD"):"Date of Birth"}
          name="studentDateofbirth"
        
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DateOfBirthPicker;
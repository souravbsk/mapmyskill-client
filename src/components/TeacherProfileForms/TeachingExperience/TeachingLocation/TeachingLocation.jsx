import { FormControl, Grid } from "@mui/material";
import Multiselect from "multiselect-react-dropdown";
import React from "react";
import "./TeachingLocation.css";
import MultiSelectField from "../../../MultiSelectField/MultiSelectField";
import { useState } from "react";
const TeachingLocation = ({ setTeachingLocation, teacherLocationData }) => {
  const [ismultiselect, setmultiselect] = useState(true);
  


  const handleTeachingLocation = (value) => {
    console.log(value);
    if (value.length > 0) {
      setmultiselect(false);
    } else {
      setmultiselect(true);
    }

    const listitemidvalue = value.map((item) => item?.listItemId);
    console.log(listitemidvalue);
    setTeachingLocation(listitemidvalue);
  };

  return (
    <Grid container spacing={2} className="location">
      <Grid xs={12} sm={12} lg={12} item>
        <div className="w-full teacherLocation">
          <FormControl fullWidth>
            <MultiSelectField
            displayValue="listItemName"
            defaultPlaceHolder="Select Teaching/Teacher Location"
            items={teacherLocationData}
            handleMultiSelect={handleTeachingLocation}
            setmultiselect={setmultiselect}
            ismultiselect={ismultiselect}
            >  
            </MultiSelectField>
          </FormControl>
        </div>
      </Grid>
    </Grid>
  );
};

export default TeachingLocation;

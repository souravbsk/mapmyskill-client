import React from "react";
import useFetchValue from "../../../../../../Hooks/useFetchValue";
import { useState } from "react";
import { FormControl, Grid } from "@mui/material";
import MultiSelectField from "../../../../../../components/MultiSelectField/MultiSelectField";
import { useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";

const UpdateTeachingLocation = ({teacherLocationData, setTeachingLocation, teachingLocation }) => {
  const [ismultiselect, setmultiselect] = useState(true);
  const [defaultData, setDefaultData] = useState([]);
  useEffect(() => {
    if (teachingLocation) {
      setDefaultData(teachingLocation);
    }
  }, [teachingLocation]);

  const handleTeachingLocation = (value) => {
    console.log(value);
    if (value.length > 0) {
      setmultiselect(false);
    } else {
      setmultiselect(true);
    }

    const listitemidvalue = value.map(
      (item) => item?.listItemId || item?.listitemid
    );
    console.log(listitemidvalue, "hello");
    setTeachingLocation(listitemidvalue);
  };

  return (
    <Grid container spacing={2} className="location">
      <Grid xs={12} sm={12} lg={12} item>
        <div className="w-full teacherLocation">
          <FormControl fullWidth>
            <Multiselect
              displayValue={"listItemName"}
              isObject={true}
              selectedValues={defaultData?.teachingLocation}
              onSelect={(teacherLocation) =>
                handleTeachingLocation(teacherLocation)
              }
              onRemove={(teacherLocation) =>
                handleTeachingLocation(teacherLocation)
              }
              options={teacherLocationData}
              placeholder={
                ismultiselect
                  ? "Select Teaching/Teacher Location"
                  : "add more.."
              }
              showArrow={true}
            />
          </FormControl>
        </div>
      </Grid>
    </Grid>
  );
};

export default UpdateTeachingLocation;

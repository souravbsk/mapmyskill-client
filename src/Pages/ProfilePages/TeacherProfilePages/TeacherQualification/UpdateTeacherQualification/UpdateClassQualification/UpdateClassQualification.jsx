import React from "react";
import LocationByPincode from "../../../../../../components/LocationByPincode/LocationByPincode";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useFetchValue from "../../../../../../Hooks/useFetchValue";

const UpdateClassQualification = ({ schoolingData, setUpdateClasses }) => {
  const { getValue: boards } = useFetchValue("teacherBoard");
  const { getValue: passingYear } = useFetchValue("passingYear");

  //console.log(schoolingData);
  const handleBoardChange = (value, index) => {
    const updatedBlocks = [...schoolingData];
    updatedBlocks[index].board = value;
    setUpdateClasses(updatedBlocks);
  };
  const handleSchoolPassingChange = (value, index) => {
    const updatedBlocks = [...schoolingData];
    updatedBlocks[index].passingYear = value;
    setUpdateClasses(updatedBlocks);
  };

  const handleSchoolName = (value, index) => {
    const updatedBlocks = [...schoolingData];
    updatedBlocks[index].schoolName = value;
    setUpdateClasses(updatedBlocks);
  };
  const handleSchoolLocation = (value, index) => {
    // console.log(value, index);
    const schoolLocation =
      value?.Name + ", " + value?.Division + ", " + value?.Pincode;
    const updatedBlocks = [...schoolingData];
    updatedBlocks[index].schoolAddress = schoolLocation;
    setUpdateClasses(updatedBlocks);
  };

  return (
    <div>
      <h2 className="level-heading  text-center text-lg md:text-xl mb-4 font-semibold">
        Update Schooling Background
      </h2>
      {schoolingData?.map((schooling, index) => (
        <div key={index}>
          <h6 className="level-heading mb-3 font-medium ">
            Class/Grade {schooling?.level == "M" ? "10th" : "12th"} Level
          </h6>
          <div className="flex items-center flex-col md:flex-row gap-3 mb-3">
            <div className="input-container w-full">
              <div className="input-holder">
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">
                    Select Board
                  </InputLabel>
                  <Select
                    value={schooling?.board}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Select Board"
                    required
                    onChange={(e) => handleBoardChange(e.target.value, index)}
                    name="tenthBoard"
                  >
                    {boards.map((board) => (
                      <MenuItem key={board.listItemId} value={board.listItemId}>
                        {board.listItemName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="input-container">
              <div className="input-holder">
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">
                    Year Of Passing
                  </InputLabel>
                  <Select
                    value={schooling?.passingYear}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Select Year Of Passing"
                    required
                    onChange={(e) =>
                      handleSchoolPassingChange(e.target.value, index)
                    }
                    name="tenthpassingYear"
                  >
                    {passingYear.map((passYear) => (
                      <MenuItem
                        key={passYear.listItemName}
                        value={passYear.listItemName}
                      >
                        {passYear.listItemName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>

          <div className="flex items-center flex-col md:flex-row gap-3 mb-3">
            <div className="input-container">
              <div className="input-holder">
                <TextField
                  required
                  name="tenthSchoolName"
                  fullWidth
                  value={schooling?.schoolName}
                  label="School Name"
                  onChange={(e) => handleSchoolName(e.target.value, index)}
                  variant="standard"
                  placeholder="Enter your school name"
                />
              </div>
            </div>
            <div className="input-container">
              <div className="input-holder">
                <InputLabel id="demo-simple-select-standard-label">
                  Enter School location
                </InputLabel>
                <LocationByPincode
                  defaultValue={schooling?.schoolAddress}
                  locationFieldName="tenthSchoolLocation"
                  instituteLocation={handleSchoolLocation}
                  index={index}
                ></LocationByPincode>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpdateClassQualification;

import React, { useEffect, useState } from 'react';
import useFetchValue from '../../../../Hooks/useFetchValue';
import { MenuItem, Select, TextField, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import DateOfBirthPicker from '../../../../components/DateOfBirthPicker/DateOfBirthPicker';
import ReactSearchcomplete from '../../../../components/ReactSearchcomplete/ReactSearchcomplete';
import LocationByPincode from '../../../../components/LocationByPincode/LocationByPincode';

const StudentInformation = ({ setStudentDatOfBirth, setInstituteName }) => {

    const { getValue: relation } = useFetchValue("relationWithStudent");
    const { getValue: Gender } = useFetchValue("Gender");
    const { getValue: boards } = useFetchValue("teacherBoard");
    const { getValue: institute } = useFetchValue("teacherInstituteName");
    const [segments, setSegments] = useState([]);
    const [storedData, setStoredData] = useState([])



    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/segment`)
            .then((response) => {
                // console.log(response.data);
                if (response?.data) {
                    setSegments(response?.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching segments:", error);
            });
    }, []);

    useEffect(() => {
        const data = localStorage.getItem("hireTutorData");
        if (data) {
            const prevData = JSON.parse(data)
            prevData ? setStoredData(prevData) : null
        }

    }, [])



    const handleInstituteName = (index, value) => {
        value ? setInstituteName(value) : null


    };

    const handleInstituteNameLocation = (value, index) => {

    };


    return (
        <div>
            <h6 className="text-xl font-medium"> Information</h6>
            <div className="flex items-center gap-6 mt-4 mb-6">
                <div className="w-full">
                    {/* <label>First Name</label> */}
                    <TextField
                        size="small"
                        fullWidth
                        variant="standard"
                        name="firstName"
                        placeholder="Enter first name"
                    />
                </div>
                <div className="w-full">
                    {/* <label>Last Name</label> */}
                    <TextField
                        size="small"
                        fullWidth
                        variant="standard"
                        name="lastName"
                        placeholder="Enter last name"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6 mb-6">
                <div className="flex-1">
                    <FormControl variant="standard" className="w-full flex-1">
                        <InputLabel id="demo-simple-select-standard-label">
                            relationship with student
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="status"
                            name="relationwithstudent"
                        >
                            {relation.map((items) => (
                                <MenuItem key={items.listItemId} value={items.listItemId}>
                                    {items.listItemName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <FormControl variant="standard" className="w-full flex-1">
                    <DateOfBirthPicker
                        setDateofBirth={setStudentDatOfBirth}
                    ></DateOfBirthPicker>
                </FormControl>
            </div>

            <div className="flex items-center gap-6 mb-6">
                <FormControl variant="standard" className="w-full flex-1">
                    <InputLabel id="demo-simple-select-standard-label">
                        Select Gender
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="status"
                        name="gender"
                    >
                        {Gender.map((items) => (
                            <MenuItem key={items.listItemId} value={items.listItemId}>
                                {items.listItemName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant="standard" className="w-full flex-1">
                    <InputLabel id="demo-simple-select-standard-label">
                        Studying in
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Studying in"
                        name="studingin"
                    >
                        {
                            segments.map((items) => (
                                <MenuItem key={items.segmentid} value={items.segmentid}>{items.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div>

            <div className="flex w-full  mb-6">
                <FormControl variant="standard" className="w-full flex-1">
                    <InputLabel id="demo-simple-select-standard-label">
                        Board/council
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="board"
                        name="board"
                    >
                        {boards.map((items) => (
                            <MenuItem key={items.listItemId} value={items.listItemId}>
                                {items.listItemName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div className="flex items-center gap-6  mb-6">
                <div className="w-full">
                    <FormControl variant="standard" className="w-full flex-1">
                        <InputLabel id="demo-simple-select-standard-label">
                            name of the institute
                        </InputLabel>
                        {/* <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="yourprivacy"
              name="nameofinstitute"
            >
              <MenuItem value={10}>University 1</MenuItem>
              <MenuItem value={11}>University 2</MenuItem>
              <MenuItem value={12}>University 3</MenuItem>
              <MenuItem value={13}>University 4</MenuItem>
            </Select> */}
                        <ReactSearchcomplete
                            allItems={institute}
                            handleOnSelect={handleInstituteName}
                            placeholder="Enter Institute name"
                        ></ReactSearchcomplete>
                    </FormControl>
                </div>
                <div className="w-full">
                    <label>Institute Location</label>
                    {/* <TextField
            size="small"
            fullWidth
            variant="standard"
            name="locationInstitute"
          /> */}
                    <LocationByPincode
                        locationFieldName="locationInstitute"
                        instituteLocation={handleInstituteNameLocation}
                    ></LocationByPincode>
                </div>
            </div>

            <div className="flex items-center gap-6  mb-6">
                <div className="terms">
                    <input name="terms" type="checkbox" />
                    <p>I agree to the terms & conditions.</p>
                </div>
            </div>


        </div>
    );
};

export default StudentInformation;
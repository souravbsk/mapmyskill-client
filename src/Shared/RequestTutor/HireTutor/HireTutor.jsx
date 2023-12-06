import React, { useContext, useEffect, useState } from 'react';
import { ReqStepperProvider } from '../../../Providers/HireTutorStepperProvider';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import ButtonSubmit from "../../../components/ButtonSubmit/ButtonSubmit";
import useFetchValue from "../../../Hooks/useFetchValue";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



const HireTutor = () => {
    const [storedData, setStoredData] = useState([])
    const [segments, setSegments] = useState([]);
    const { setStep } = useContext(ReqStepperProvider)
    const [subjects, setSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const navigate = useNavigate()
    const { getValue: studentLocation } = useFetchValue(
        "studentTrainingLocation"
    );
    const { getValue: mediumOfInstruction } = useFetchValue("language");
    const { getValue: studentsInGroup } = useFetchValue("studentsInGroup");
    const { getValue: sessionsPerWeek } = useFetchValue("sessionsPerWeek");
    const { getValue: privacy } = useFetchValue("contactDisplay");
    const { getValue: bestTimeToCall } = useFetchValue("bestTimeToCall");
    const { getValue: genderPreference } = useFetchValue("genderPreference");
    const { getValue: maritalStatus } = useFetchValue("maritalStatus");
    const { getValue: teacherAgeGroup } = useFetchValue("teacherAgeGroup");
    const { getValue: teacherBoard } = useFetchValue("teacherBoard");


    useEffect(() => {
        const data = localStorage.getItem("hireTutorData");
        if (data) {
            const prevData = JSON.parse(data)
            prevData ? setStoredData(prevData) : null
        }

    }, [])

    //============Options from database for fields- START==================
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

    const handleSegmentChange = (value) => {
        // Fetch subjects based on the selected segment
        axios
            .get(`http://localhost:8080/api/subject/bysegment/${value}`)
            .then((response) => {
                setSubjects(response.data);
            })
            .catch((error) => {
                console.error("Error fetching subjects:", error);
            });
    };

    const handleSelectedSubjects = (e) => {
        const value = e.target.value;

        // Toggle the value in the selectedSubjects array
        if (selectedSubjects.includes(value)) {
            setSelectedSubjects((prevSelectedSubjects) =>
                prevSelectedSubjects.filter((subjectId) => subjectId !== value)
            );
        } else {
            setSelectedSubjects((prevSelectedSubjects) => [
                ...prevSelectedSubjects,
                value,
            ]);
        }
    };




    //============Options from database for fields- END==================

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const segment = form?.segmentid.value;
        const studentLocation = form?.studentClassLocation.value;
        const mediumOfInstruction = form?.instructionMedium.value;
        const studentsGroup = form?.noOfStudents.value;
        const noOfSessions = form?.sessionsPerWeek.value;
        const budgetFees = form?.feeBudget.value;
        const setPrivacy = form?.studentPrivacy.value;
        const timeToCall = form?.bestTimeToCall.value;
        const requirement = form?.requirementDesc.value;
        const gender = form?.genderPreference.value;
        const teacherMaritalStatus = form?.maritalStatus.value;
        const ageGroup = form?.teacherAgeGroup.value;
        const schoolingBackground = form?.teacherSchooling.value;

        const studentLevelPayload = {
            userid: "",
            segmentid: segment,
            locationid: studentLocation,
            instructionmedium: mediumOfInstruction,
            studentsgroup: studentsGroup,
            sessionsperweek: noOfSessions,
            budget: budgetFees,
            privacyid: setPrivacy,
            bestcalltime: timeToCall,
            requirementdesc: requirement,
            gender: gender,
            maritalstatus: teacherMaritalStatus,
            agegroup: ageGroup,
            schoolingpref: schoolingBackground,
        };

        const subjectPayload = {
            userid: "",
            segmentid: segment,
            subjectid: selectedSubjects,
        };

        const hireTutor = [studentLevelPayload, subjectPayload]


        //console.log("studentLevelPayload", studentLevelPayload);
        //console.log("subjectPayload", subjectPayload);
        localStorage.setItem("hireTutorData", JSON.stringify(hireTutor));

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your details hase been saved successfully',
            showConfirmButton: false,
            timer: 1500
        })
        setStep(1)
        navigate("/request-tutor/contact");
    };

    //console.log("storedData", storedData[0]?.segmentid);


    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-full md:w-8/12 mx-auto">
                <div className="max-w-3xl bg-[#FBFFFF] p-3 rounded-md mb-4 my-0 mx-auto shadow-md">
                    <h2 className="level-heading text-center text-xl md:text-2xl mb-4 font-semibold">
                        Hire a tutor
                    </h2>
                    <div className="flex items-center flex-col md:flex-row gap-3 mb-3">
                        <div className="w-full">
                            <div className="input-holder">
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">
                                        Select Segment
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Select Segment"
                                        name="segmentid"
                                        required
                                        defaultValue={storedData[0]?.segmentid || ''}
                                        onChange={(e) => handleSegmentChange(e.target.value)}
                                    >
                                        {segments && segments?.map((segment) => (
                                            <MenuItem
                                                key={segment.segmentid}
                                                value={segment.segmentid}
                                            >
                                                {segment.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center flex-col md:flex-row gap-3 mb-3">
                        <div className="w-full">
                            <div className="input-holder">
                                <FormControl variant="standard" fullWidth>
                                    <div className="mb-4 h-40 border-2 rounded-md border-gray-300 overflow-y-auto">
                                        <ul className="subject-checkboxes">
                                            {subjects.map((subject) => (
                                                <li key={subject.id}>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            value={subject.subjectid}
                                                            onClick={handleSelectedSubjects}
                                                            check={selectedSubjects.includes(
                                                                subject.subjectid
                                                            )}
                                                        />
                                                        {subject.name}
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </FormControl>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center flex-col md:flex-row gap-3 mb-3">
                        <div className="w-full">
                            <div className="input-holder">
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">
                                        Class Location
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Select Class Location"
                                        name="studentClassLocation"
                                        required
                                    >
                                        {studentLocation.map((items) => (
                                            <MenuItem value={items.listItemId} key={items.listItemId}>
                                                {items.listItemName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="input-holder">
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">
                                        Select Medium of Instruction
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Select Medium Of Instruction"
                                        name="instructionMedium"
                                        required
                                    >
                                        {mediumOfInstruction.map((items) => (
                                            <MenuItem key={items.listItemId} value={items.listItemId}>
                                                {items.listItemName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    {/* <h6 className="level-heading twelve mb-3 font-medium">
                          Class/Grade 12th Level
                      </h6> */}
                    <div className="flex items-center flex-col md:flex-row gap-3 mb-3">
                        <div className="w-full">
                            <div className="input-holder">
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">
                                        No.Of Student in Group
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="No. Of Student in Group"
                                        name="noOfStudents"
                                        required
                                    >
                                        {studentsInGroup.map((items) => (
                                            <MenuItem key={items.listItemId} value={items.listItemId}>
                                                {items.listItemName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="input-holder">
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">
                                        No.Of Sessions per week
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="No. Of Sessions per week"
                                        name="sessionsPerWeek"
                                        required
                                    >
                                        {sessionsPerWeek.map((items) => (
                                            <MenuItem key={items.listItemId} value={items.listItemId}>
                                                {items.listItemName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center flex-col md:flex-row gap-3 mb-3">
                        <div className="w-full">
                            <div className="input-holder">
                                <FormControl variant="standard" fullWidth>
                                    {/* <InputLabel id="demo-simple-select-standard-label">Enter Fees Budget</InputLabel> */}
                                    <TextField
                                        name="feeBudget"
                                        fullWidth
                                        label="Enter Fees Budget"
                                        variant="standard"
                                        placeholder="Enter fees budget"
                                        required
                                    />
                                </FormControl>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="input-holder">
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">
                                        Set your privacy
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Set your privacy"
                                        name="studentPrivacy"
                                        required
                                    >
                                        {privacy.map((items) => (
                                            <MenuItem key={items.listItemId} value={items.listItemId}>
                                                {items.listItemName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center flex-col md:flex-row gap-3 mb-3">
                        <div className="w-full">
                            <div className="input-holder">
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">
                                        Best time to call
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Best time to call"
                                        name="bestTimeToCall"
                                        required
                                    >
                                        {bestTimeToCall.map((items) => (
                                            <MenuItem key={items.listItemId} value={items.listItemId}>
                                                {items.listItemName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center flex-col md:flex-row gap-3 mb-3">
                        <div className="w-full">
                            <div className="input-holder">
                                <FormControl variant="standard" fullWidth>
                                    <TextField
                                        name="requirementDesc"
                                        fullWidth
                                        label="Elaborate your requirement"
                                        variant="standard"
                                        placeholder="Enter your requirement"
                                        multiline
                                        maxRows={2}
                                        required
                                    />
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <h2 className="level-heading text-lg md:text-xl mt-4 mb-2 font-semibold">
                        Set Tutor Preference
                    </h2>
                    <div className="flex items-center flex-col md:flex-row gap-3 mb-3">
                        <div className="w-full">
                            <div className="input-holder">
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">
                                        Gender Preference
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Gender Preference"
                                        name="genderPreference"
                                        required
                                    >
                                        {genderPreference.map((items) => (
                                            <MenuItem key={items.listItemId} value={items.listItemId}>
                                                {items.listItemName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="input-holder">
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">
                                        Marital status Preference
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Marital status Preference"
                                        name="maritalStatus"
                                        required
                                    >
                                        {maritalStatus.map((items) => (
                                            <MenuItem key={items.listItemId} value={items.listItemId}>
                                                {items.listItemName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center flex-col md:flex-row gap-3 mb-3">
                        <div className="w-full">
                            <div className="input-holder">
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">
                                        Age group Preference
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Age group Preference"
                                        name="teacherAgeGroup"
                                        required
                                    >
                                        {teacherAgeGroup.map((items) => (
                                            <MenuItem key={items.listItemId} value={items.listItemId}>
                                                {items.listItemName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="input-holder">
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">
                                        Schooling Background Preference
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Schooling Background  Preference"
                                        name="teacherSchooling"
                                        required
                                    >
                                        {teacherBoard.map((items) => (
                                            <MenuItem key={items.listItemId} value={items.listItemId}>
                                                {items.listItemName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <ButtonSubmit
                            alignValue="right"
                            btnText="Save and Continue"
                        ></ButtonSubmit>
                    </div>
                </div>
            </form>
        </div>

    );
};

export default HireTutor;
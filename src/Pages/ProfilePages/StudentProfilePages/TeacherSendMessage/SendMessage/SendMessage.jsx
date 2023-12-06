import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import MultiSelectField from "../../../../../components/MultiSelectField/MultiSelectField";
import ButtonSubmit from "../../../../../components/ButtonSubmit/ButtonSubmit";
import { useState } from "react";
import useFetchValue from "../../../../../Hooks/useFetchValue";
import useAuthChanged from "../../../../../Hooks/useAuthChanged";
import axios from "axios";
import Swal from "sweetalert2";

const SendMessage = ({ segmentData, id }) => {
  console.log(segmentData, "segment data");

  const { user } = useAuthChanged();
  const [subjects, setSubjects] = useState([]);
  const [interestedinValues, setInterestedinValues] = useState([]);
  const [ismultiselect, setmultiselect] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const { getValue: studentLocations } = useFetchValue(
    "studentTrainingLocation"
  );

  const handleSegmentData = (e) => {
    setSubjects({});
    const segmentValue = e.target.value;
    const subjectDatas = segmentData.find(
      (item) => item?.segment == segmentValue
    );
    if (subjectDatas) {
      setSubjects(subjectDatas?.subjectData);
    }
  };

  const handleinterestin = (value) => {
    console.log(value);
    if (value.length > 0) {
      setmultiselect(false);
    } else {
      setmultiselect(true);
    }

    const listitemidvalue = value.map((item) => item?.listItemId);
    console.log(listitemidvalue);
    setInterestedinValues(listitemidvalue);
  };

  const handleSubmitRequirement = (e) => {
    e.preventDefault();
    const from = e.target;
    const messagetitle = from.messagetitle.value;
    const segmentValue = Number(from.segmentValue.value);
    const subjectvalue = Number(from.subjectvalue.value);
    const locationValue = interestedinValues;
    const description = from.description.value;
    const budget = from.budget.value;

    if (!isChecked) {
      alert("please check the thik mark");
      return;
    }

    if (isNaN(budget)) {
      alert("budget must be number");
      return;
    }

    const newRequrement = {
      userid: user?.userid,
      messagetitle: messagetitle,
      senderid: id,
      segmentid: segmentValue,
      subjectid: subjectvalue,
      locationid: locationValue,
      description,
      budget,
    };

    axios
      .post(`http://localhost:8080/api/messagetoteacher`, newRequrement)
      .then((res) => {
        if (res?.data?.success) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Requirement submitted",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="p-5">
      <p>
        Hello BISWAJIT, Thanks for checking out my tutor profile. Before
        proceeding please let me know the details below:
      </p>
      <form className="" onSubmit={handleSubmitRequirement}>
        <div className="mb-5">
          <TextField
            required
            name="messagetitle"
            className="w-full"
            id="outlined-basic"
            label="Tell me your learning requirement in a line"
            variant="outlined"
          />
        </div>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            What Segment do you want to learn?
          </InputLabel>
          <Select
            required
            name="segmentValue"
            className="mb-5"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => handleSegmentData(e)}
            label="What Segment do you want choose?"
          >
            {segmentData &&
              segmentData?.map((item) => (
                <MenuItem key={item?.id} value={item?.segment}>
                  {item?.segment_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            What subject do you want to learn?
          </InputLabel>
          <Select
            required
            name="subjectvalue"
            className="mb-5"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="What subject do you want to learn?"
          >
            {subjects?.map((sub) => (
              <MenuItem key={sub?.subject_id} value={sub?.subject_id}>
                {sub?.subject_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <label>Location Preference</label>
          <MultiSelectField
            displayValue="listItemName"
            defaultPlaceHolder="select interest in"
            items={studentLocations}
            handleMultiSelect={handleinterestin}
            setmultiselect={setmultiselect}
            ismultiselect={ismultiselect}
          ></MultiSelectField>
        </FormControl>
        <div className="mt-5 ">
          <label htmlFor="">Elaborate your learning requirements</label>
          <textarea
            required
            name="description"
            id="description"
            className="w-full border-2 p-5 h-48"
          ></textarea>
        </div>
        <div className="mt-5">
          <TextField
            className="w-full"
            id="outlined-basic"
            name="budget"
            label="Tuition Budget (Optional)"
            variant="outlined"
          />
        </div>
        <div className="mt-5">
          <p>
            <Checkbox
              name="check"
              onChange={(e) => setIsChecked(e.target.checked)}
              label="Small"
              size="sm"
            />{" "}
            I allow other tutors to contact me
          </p>
        </div>

        <ButtonSubmit alignValue="center mt-5" btnText="Submit"></ButtonSubmit>
      </form>
    </div>
  );
};

export default SendMessage;

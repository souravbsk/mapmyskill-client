import React, { useEffect, useState } from "react";
import RightSideModal from "../../Shared/RightSideModal/RightSideModal";
import { Box, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import instance from "../../config/axios.config";
import Swal from "sweetalert2";

const SubjectForm = ({
  isShowModal,
  dynamicText,
  isAdd,
  setReFetch,
  reFetch,
  updateSubject,
  setShowModal,
  error,
  updateId,
}) => {
  console.log("updateId", updateId);

  const [segments, setSegments] = useState([]);

  useEffect(() => {
    instance.get("/api/segment/").then((res) => {
      setSegments(res.data);
    });
  }, []);

  const handleAddSubject = (e) => {
    e.preventDefault();
    const name = e.target.subject.value;
    const segmentId = e.target.segment.value;
    const newSubject = {
      name,
      segmentId,
    };
    instance.post("api/subject", newSubject).then((res) => {
      if (res.statusText == "OK") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Subject Has been Added",
          showConfirmButton: false,
          timer: 1500,
        });
        setReFetch(!reFetch);
        e.target.reset();
        setShowModal(false);

        console.log(res);
      }
    });
  };

  const handleUpdateSubject = (e) => {
    e.preventDefault();
    const name = e.target.subject.value;
    const segmentid = e.target.segment.value;
    const updateSubject = {
      name,
      segmentid,
    };

    instance.put(`api/subject/${updateId}`, updateSubject).then((res) => {
      if (res.statusText == "OK") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Subject Has been Update",
          showConfirmButton: false,
          timer: 1500,
        });
        setReFetch(!reFetch);
        e.target.reset();
        setShowModal(false);
        console.log(res);
      }
    });
  };

  return (
    <RightSideModal isShowModal={isShowModal}>
      <form
        className="flex h-full px-4 flex-col justify-between"
        onSubmit={isAdd ? handleAddSubject : handleUpdateSubject}
      >
        <h1>{isAdd ? `Add ${dynamicText}` : `Update ${dynamicText}`}</h1>
        <Box>
          <Box className="mt-8">
            <TextField
              fullWidth
              defaultValue={updateSubject?.name}
              id="outlined-basic"
              label="Subject Name"
              variant="outlined"
              type="text"
              name="subject"
            />
          </Box>
          <Box className="mt-8">
            <InputLabel id="demo-simple-select-label">Segment Name</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="segment"
              name="segment"
              defaultValue={updateSubject.segmentid}
            >
              {segments?.map((item, i) => (
                <MenuItem key={i} value={item.segmentid}>
                  {item?.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Box className="btn_container mt-auto">
          {isAdd ? (
            <button className="submit_btn">Submit</button>
          ) : (
            <button className="submit_btn">Update</button>
          )}
          <button className="c_btn" onClick={() => setShowModal(false)}>
            Cancel
          </button>
        </Box>
      </form>
    </RightSideModal>
  );
};

export default SubjectForm;
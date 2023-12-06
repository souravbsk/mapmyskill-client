import React, { useEffect, useState } from "react";
import RightSideModal from "../../Shared/RightSideModal/RightSideModal";
import { Box, TextField, Typography } from "@mui/material";
import instance from "../../config/axios.config";
import Swal from "sweetalert2";

const SagmentForm = ({
  isShowModal,
  dynamicText,
  isAdd,
  setReFetch,
  reFetch,
  updateSagment,
  setShowModal,
  error,
  updateId,
}) => {


  console.log(updateSagment);

  const [category, setCategory] = useState([]);
  useEffect(() => {
    instance.get("api/category").then((res) => {
      setCategory(res.data);
    });
  }, []);

  const handleAddSagment = (e) => {
    e.preventDefault();
    const segmentName = e.target.segmentName.value;
    const cid = e.target.cid.value;

    const payLoad = { name: segmentName, categoryid: cid };
    console.log("payload", payLoad);

    instance
      .post("/api/segment/", payLoad)
      .then((res) => {
        if (res.statusText == "OK") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Segment Has been Added",
              showConfirmButton: false,
              timer: 1500,
            });
            setReFetch(!reFetch);
            e.target.reset();
            setShowModal(false);
    
            console.log(res);
          }
        
      })
      .catch((err) => {
        console.log("add segment failed", err);
      });
  };

  // put segment data
  const handleUpdateSagment = (e) => {
    e.preventDefault();
    const segmentName = e.target.segmentName.value;
    const cid = e.target.cid.value;

    const payLoad = { name: segmentName, categoryid: cid };
    instance
      .put(`/api/segment/${updateSagment.segmentid}`, payLoad)
      .then((res) => {
        if (res.statusText == "OK") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Segment Has been Update",
              showConfirmButton: false,
              timer: 1500,
            });
            setReFetch(!reFetch);
            e.target.reset();
            setShowModal(false);
            console.log(res);
          }
       
      })
      .catch((err) => {
        console.log("update user failed", err);
      });
  };


  console.log(updateSagment);

  return (
    <RightSideModal isShowModal={isShowModal}>
      <form
        className="flex h-full px-4 flex-col justify-between"
        onSubmit={isAdd ? handleAddSagment : handleUpdateSagment}
      >
        <Box>
          <h1>{isAdd ? `Add ${dynamicText}` : `Update ${dynamicText}`}</h1>
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              name="segmentName"
              defaultValue={updateSagment?.name}
              id="outlined-basic"
              label="Segment Name"
              variant="outlined"
              type="text"
            />
            <select name="cid" defaultValue={updateSagment?.categoryid}>
              <option>Select Category.........</option>
              {category.map((e) => (
                <option key={e.categoryid} value={e.categoryid}>
                  {e.name}
                </option>
              ))}
            </select>
            <Typography sx={{ color: "red" }}>{error}</Typography>
          </Box>
        </Box>
        <Box className="btn_container">
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

export default SagmentForm;

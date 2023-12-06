import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "react-quill/dist/quill.snow.css";
import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ReactQuill from "react-quill";
import { useState } from "react";
import useFetchValue from "../../Hooks/useFetchValue";
import axios from "axios";
import Swal from "sweetalert2";
import useGetValue from "../../Hooks/useGetValue";
import "react-quill/dist/quill.snow.css";
import usePlanDataValue from "../../Hooks/usePlanDataValue";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddSubcription = ({ open, setOpen, reFetch, setRefetch }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { getValue: planPeriods } = useFetchValue("planperiod");
  const { getValue: plantypes } = useFetchValue("plantypes");
  const [planDes, setplanDes] = useState("");

  const [periodValue, setperiodValue] = useState("");

  const { itemValue: perclickValue } = usePlanDataValue("perclick");

  const handleChange = (value) => {
    setplanDes(value);
  };

  const handleSubmitSubscription = (e) => {
    e.preventDefault();
    const from = e.target;
    const planname = from?.planName?.value;
    const planperiod = Number(from?.planperiods?.value);
    const description = planDes;
    const planterm = Number(from?.planTerms?.value);
    const amount = Number(from?.price?.value);
    const plantypes = Number(from?.plantypes?.value);

    if (isNaN(amount)) {
      alert("please price must be number");
      return;
    }
    if (isNaN(planterm)) {
      alert("plan terms must be number");
      return;
    }

    const addNewPlan = {
      planname,
      planperiod,
      description,
      planterm,
      amount,
      plantypes,
      status: false,
    };

    console.log(addNewPlan);

    axios
      .post("http://localhost:8080/api/subscriptionplans", addNewPlan)
      .then((res) => {
        console.log(res);
        if (res?.data?.id) {
          setOpen(false);
          setplanDes("");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Plan has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          setRefetch(!reFetch);
        }
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmitSubscription} action="">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <FormControl
                  className="w-full"
                  variant="standard"
                  sx={{ m: 1, minWidth: 120 }}
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Plan Types
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    className="w-full"
                    label="plantypes"
                    name="plantypes"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {plantypes?.map((type) => (
                      <MenuItem value={type?.listItemId}>
                        {type?.listItemName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-full">
                  <TextField
                    className="w-full"
                    id="standard-basic"
                    name="planName"
                    label="Add Plan Name:"
                    variant="standard"
                  />
                </div>
                <FormControl
                  className="w-full"
                  variant="standard"
                  sx={{ m: 1, minWidth: 120 }}
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Plan Periods
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    className="w-full"
                    onChange={(e) => setperiodValue(e.target.value)}
                    label="planperiods"
                    name="planperiods"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {planPeriods?.map((period) => (
                      <MenuItem value={period?.listItemId}>
                        {period?.listItemName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="py-6 mb-6">
                <ReactQuill
                className="h-48"
                  value={planDes}
                  onChange={handleChange}
                  placeholder="Start typing..."
                  //   readOnly={isReadOnly}
                />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-full">
                  <TextField
                    name="price"
                    className="w-full"
                    id="outlined-basic"
                    label="Price"
                    variant="outlined"
                  />
                </div>

                <div className="w-full">
                  <TextField
                    name="planTerms"
                    className="w-full"
                    id="outlined-basic"
                    label="Number Of Contact"
                    disabled={periodValue != perclickValue}
                    variant="outlined"
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <button className="bg-[#071425] text-white px-3 py-2">
                Submit Plan
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddSubcription;

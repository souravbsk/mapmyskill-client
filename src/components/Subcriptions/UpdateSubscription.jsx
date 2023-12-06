import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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
const UpdateSubscription = ({
  updateopen,
  planData,
  setupdateOpen,
  reFetch,
  setRefetch,
}) => {
  console.log(planData, "plan data");
  const { getValue: planPeriods } = useFetchValue("planperiod");
  const { getValue: plantypes } = useFetchValue("plantypes");

  const [planDes, setplanDes] = useState(planData?.description);

  const [periodValue, setperiodValue] = useState(
    planData?.planperiodvalue && planData?.planperiodvalue
  );

  console.log(planData);
  const { itemValue: perclickValue } = usePlanDataValue("perclick");

  const handleChange = (value) => {
    setplanDes(value);
  };
  console.log(planData);

  const handleSubmitSubscription = (e) => {
    e.preventDefault();
    const from = e.target;
    const planname = from.planName.value;
    const planperiod = from.planperiods.value;
    const description = planDes;
    const planterm = from?.planTerms?.value;
    const plantype = from?.plantypes?.value;
    const amount = from?.price?.value;
    console.log(planterm);

    if (isNaN(amount)) {
      alert("please price must be number");
      return;
    }

    if (planterm && planterm <= 0) {
      console.log("dsfsdfsdf");
      alert("Plan terms must be greater than 0");
      return;
    }

    if (planterm && isNaN(planterm)) {
      alert("Plan terms must be a number.");
      return;
    }

    const UpdatePlan = {
      planname,
      planperiod,
      description,
      planterm: planterm !== undefined ? planterm : 0,
      amount,
      plantype,
    };
    console.log(UpdatePlan);

    axios
      .put(
        `http://localhost:8080/api/subscriptionplans/update/${planData?.planid}`,
        UpdatePlan
      )
      .then((res) => {
        if (res?.data?.data?.id) {
          setupdateOpen(false);
          setplanDes("");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Plan has been updated",
            showConfirmButton: false,
            timer: 1500,
          });
          setRefetch(!reFetch);
        }
        console.log("object", res);
      });
  };

  const handleClose = () => {
    setplanDes("");
    setperiodValue("");
    setupdateOpen(false);
  };

  console.log(perclickValue, periodValue);

  return (
    <div>
      <Modal
        open={updateopen}
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
                    defaultValue={planData?.plantype}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {plantypes?.map((plan) => (
                      <MenuItem value={plan?.listItemId}>
                        {plan?.listItemName}
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
                    defaultValue={planData?.planname}
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
                    label="planperiods"
                    name="planperiods"
                    onChange={(e) => setperiodValue(e.target.value)}
                    defaultValue={planData?.planperiodvalue}
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
              <div className="mb-6">
                <ReactQuill
                  value={planDes || planData?.description}
                  onChange={handleChange}
                  placeholder="Start typing..."
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
                    defaultValue={planData?.amount}
                  />
                </div>

                {(periodValue || planData?.planperiodvalue) == perclickValue ? (
                  <div className="w-full">
                    <TextField
                      name="planTerms"
                      required
                      className="w-full"
                      id="outlined-basic"
                      label="Number Of Contact"
                      variant="outlined"
                      defaultValue={planData?.planterm}
                    />
                  </div>
                ) : null}
              </div>
            </div>

            <div className="text-center mt-6">
              <button className="bg-[#071425] text-white px-3 py-2">
                Update Plan
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
export default UpdateSubscription;

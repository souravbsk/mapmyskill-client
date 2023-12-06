import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import axios from "axios";
import Swal from "sweetalert2";
const PlanStatus = ({ row, reFetch, setRefetch }) => {
  const handleChange = (event, rowVlaue) => {
    const switchValue = event?.target?.checked;
    const planid = rowVlaue?.original?.planid;

    axios
      .put(`http://localhost:8080/api/subscriptionplans/update/${planid}`, {
        status: switchValue,
      })
      .then((res) => {
        console.log(res);
        if (res.data.data.id) {
          if (res.data.data.status) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your Plan has been Active",
              showConfirmButton: false,
              timer: 1500,
            });
          }

          if (!res.data.data.status) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your Plan has been Inactive",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          setRefetch(!reFetch);
        }
      });
  };

  return (
    <Switch
      checked={row?.original?.status}
      onChange={(e) => handleChange(e, row)}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

export default PlanStatus;

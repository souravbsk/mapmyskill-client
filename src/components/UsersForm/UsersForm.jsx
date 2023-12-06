import React, { useEffect, useState } from "react";
import RightSideModal from "../../Shared/RightSideModal/RightSideModal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/material.css";
import {
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import instance from "../../config/axios.config";
import Swal from "sweetalert2";
import "./UsersForm.css";

const UsersForm = ({
  isShowModal,
  dynamicText,
  isAdd,
  setReFetch,
  reFetch,
  UpdateUser,
  setShowModal,
  error,
  updateId,
}) => {
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    instance.get("api/role").then((res) => {
      setRoles(res.data);
    });
  }, []);

  const handleAddUsers = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const roleid = form.role.value;
    //number split
    const numberPhone = form.phone.value;
    const numberArray = numberPhone.split(" ");
    const isdcode = numberArray[0];
    const mobile = numberArray[1].replace(/[-+]/g, "");
    // password matching
    if (password != confirmPassword) {
      alert("password doesnot match");
      return;
    }
    const payLoad = {
      roleid,
      isdcode,
      mobile,
      email,
      password,
    };
    console.log(payLoad);
    // user exist checking
    instance.get(`api/users/${email}/${mobile}`).then((res) => {
      console.log(res);
      if (res?.data?.exist) {
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: "User Mobile or Email Already Exist",
        });
      } else if (!res.data?.exist) {
        // user new added
        instance.post("api/users", payLoad).then((res) => {
          if (res.statusText == "OK") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "User Has been Added",
              showConfirmButton: false,
              timer: 1500,
            });
            setReFetch(!reFetch);
            form.reset();
            setShowModal(false);
          }
        });
      }
    });
  };

  const defaultPhoneNumber = UpdateUser?.isdcode + UpdateUser?.mobile;
  const isValidPhoneNumber = typeof defaultPhoneNumber === "string";
  const handleUpdateUsers = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const roleid = form.role.value;

    //number split
    const numberPhone = form.phone.value;
    const numberArray = numberPhone.split(" ");
    const isdcode = numberArray[0];
    const mobile = numberArray[1].replace(/[-+]/g, "");
    // password matching
    if (password != confirmPassword) {
      alert("password doesnot match");
      return;
    }

    console.log(email, password, roleid, isdcode, mobile, "update");

    const payLoad = {
      roleid,
      isdcode,
      mobile,
      email,
      password,
    };

    instance.put(`api/users/${UpdateUser?.userid}`, payLoad).then((res) => {
      if (res.statusText == "OK") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Users Has been Update",
          showConfirmButton: false,
          timer: 1500,
        });
        setReFetch(!reFetch);
        form.reset();
        setShowModal(false);
        console.log(res);
      }
    });
  };

  return (
    <RightSideModal isShowModal={isShowModal}>
      <form
        className="flex h-full px-4 flex-col justify-between"
        onSubmit={isAdd ? handleAddUsers : handleUpdateUsers}
      >
        <h1 className="mb-4">
          {isAdd ? `Add ${dynamicText} `: `Update ${dynamicText}`}
        </h1>
        <Box>
          <Box className="mt-4 adminPhoneInput">
            {isValidPhoneNumber ? (
              <PhoneInput
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: true,
                }}
                variant="outlined"
                country={"in"}
                onlyCountries={["in"]}
                value={defaultPhoneNumber}
              />
            ) : (
              <PhoneInput
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: true,
                }}
                variant="outlined"
                country={"in"}
                onlyCountries={["in"]}
              />
            )}
          </Box>
          <Box className="my-4">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              defaultValue={UpdateUser?.email}
            />
          </Box>

          <Box className="mb-4">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              defaultValue={UpdateUser.password}
            />
          </Box>
          <Box className="mb-4">
            <TextField
              id="outlined-basic"
              label="Confirm password"
              variant="outlined"
              type="password"
              name="confirmPassword"
              defaultValue={UpdateUser.password}
            />
          </Box>
          <Box>
            <InputLabel id="demo-simple-select-label">Role Name</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="role"
              name="role"
              defaultValue={UpdateUser.roleid}
            >
              {roles.map((role, i) => (
                <MenuItem key={i} value={role?.roleid}>
                  {role?.name}
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

export default UsersForm;
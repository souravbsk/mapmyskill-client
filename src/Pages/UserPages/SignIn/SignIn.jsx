import React from "react";
import LoginBanner from "../../../assets/auth/loginBanner.png";
import { PiStudentDuotone } from "react-icons/pi";
import { TextField } from "@mui/material";
import ButtonSubmit from "../../../components/ButtonSubmit/ButtonSubmit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.emailPhone.value;
    const password = form.password.value;
    const loginUser = {
      email,
      password,
    };
    //console.log(loginUser);
    axios
      .post("http://localhost:8080/api/users/login", loginUser)
      .then((res) => {
        if (res.data.success) {
          setError("");

          const token = res?.data?.token;
          if (token) {
            localStorage.setItem("mapmyskill-token", token);
            navigate("/myaccount/dashboard");
          }
        }
      })
      .catch((error) => {
        setError("");

        setError(error?.response?.data?.error);

        // Handle the error as needed, e.g., display an error message to the user.
      });
  };

  return (
    <div className="">
      <div className=" mt-18 ">
        <div className="flex items-center justify-between ">
          <div className="bg-[#F0F7F3] py-20 flex-1">
            <img
              className="w-[448px] mx-auto h-[448px]"
              src={LoginBanner}
              alt=""
            />
          </div>
          <div className="flex-1 ">
            <div className="max-w-full md:w-8/12 mx-auto">
              <h3 className="text-xl font-semibold mb-5">New Member Sign Up</h3>
              <div className="flex items-center gap-5">
                <div className="flex grow items-center border-2 shadow-lg duration-300 hover:border-[#1565C0] px-4 py-6 rounded-lg flex-col gap-3">
                  <PiStudentDuotone size={22}></PiStudentDuotone>
                  <p className="font-medium">I need a Tutor</p>
                </div>
                <div className="flex grow items-center border-2 shadow-lg duration-300 hover:border-[#1565C0] px-4 py-6 rounded-lg flex-col gap-3">
                  <PiStudentDuotone size={22}></PiStudentDuotone>
                  <p className="font-medium">I need a Tutor</p>
                </div>
                <div className="flex grow items-center border-2 shadow-lg duration-300 hover:border-[#1565C0] px-4 py-6 rounded-lg flex-col gap-3">
                  <PiStudentDuotone size={22}></PiStudentDuotone>
                  <p className="font-medium">I need a Tutor</p>
                </div>
              </div>

              <div className=" mt-14">
                <h3 className="text-xl font-semibold mb-5">
                  Existing Member Sign In
                </h3>
                <form
                  onSubmit={handleLoginSubmit}
                  action=""
                  className="space-y-6"
                >
                  <div>
                    <TextField
                      className="w-full"
                      id="outlined-basic"
                      label="Email or Phone Number"
                      variant="outlined"
                      name="emailPhone"
                    />
                  </div>
                  <div>
                    <TextField
                      className="w-full"
                      type="password"
                      id="outlined-basic"
                      label="Password"
                      name="password"
                      variant="outlined"
                    />
                  </div>
                  <ButtonSubmit btnText="Login"></ButtonSubmit>
                  <p className="text-red-600">{error}</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

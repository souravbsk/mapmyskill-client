import { sendSignInLinkToEmail } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import auth from "../../config/firebase.config";
import { useSearchParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import LoadingProgress from "../LoadingProgress/LoadingProgress";

const EmailVerifyCard = ({ email, userId }) => {
  const [emailValue, setEmailValue] = useState(email);
  const emailRef = useRef();
  const [isTrue, setTrue] = useState("");
  const [sendLink, setSendLink] = useState(true);

  useEffect(() => {
    setEmailValue(email);
  }, [email]);

  const handleEmailVerifyLink = () => {
    const email = emailRef.current.value;
    setSendLink(false);
    sendSignInLinkToEmail(auth, email, {
      url: "http://localhost:5173/Signup?email=true",
      handleCodeInApp: true,
    })
      .then((result) => {
        window.localStorage.setItem("emailForSignIn", email);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Email Verify Link Send on your Email",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleUpdateEmail = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    //email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Email",
      });
      return;
    }

    axios
      .put(`http://localhost:8080/api/users/updateMobileEmail/${userId}`, {
        email,
      })
      .then((res) => {
        if (res.data.success) {
          const EmailVerify = {
            emailId: email,
            isEmailVarified: "N",
          };
          axios
            .put(`http://localhost:8080/api/profile/${userId}`, EmailVerify)
            .then((res) => {
              if (res.data.success) {
                const userInfo = JSON.parse(localStorage.getItem("user_Info"));
                userInfo.email = res.data?.data?.emailId;
                setEmailValue(res.data?.data?.emailId);
                localStorage.setItem("user_Info", JSON.stringify(userInfo));
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Your Email has been updated",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        }
      });
  };
  return (
    <div>
      <h2 className="text-center mb-3 text-[#1976D2] text-xl">Email Verify</h2>
      <form onSubmit={handleUpdateEmail}>
        <div className=" flex items-center justify-between gap-3 w-full">
          <TextField
            className="input-holder w-full"
            type="email"
            id="standard-basic"
            label="Enter Email"
            variant="standard"
            inputRef={emailRef}
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <Button
            type="button"
            className="shrink-0"
            onClick={handleEmailVerifyLink}
            variant="contained"
          >
            {sendLink ? "send link" : "resend link"}
          </Button>
        </div>
        <div className=" mt-3">
          <Button type="submit" variant="contained">
            Update Email
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmailVerifyCard;
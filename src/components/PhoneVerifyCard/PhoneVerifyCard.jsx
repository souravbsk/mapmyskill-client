import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useContext, useRef, useState } from "react";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import auth from "../../config/firebase.config";
import { StepperProvider } from "../../Providers/ShowSteperProvider";
import { Button, CircularProgress } from "@mui/material";
import LoadingProgress from "../LoadingProgress/LoadingProgress";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PhoneVerifyCard = ({ phone, userId, setRefetch, refetch, mobile }) => {
  const [isShowOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState("");
  const { setStep } = useContext(StepperProvider);
  const [isLoading, setLoading] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");

  const navigate = useNavigate()

  console.log("phone", phone);
  console.log("userId", userId);
  console.log("mobile", mobile);

  const setUpReCaptcha = (number) => {
    console.log(number);
    const recaptureVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
    recaptureVerifier.render();
    setLoading(true);
    return signInWithPhoneNumber(auth, number, recaptureVerifier);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const phoneNumber = e.target.mobile.value;
    try {
      const response = await setUpReCaptcha(phoneNumber);
      console.log(response);
      if (response) {
        setLoading(false);
        setConfirmationResult(response);
        setShowOtpInput(true);
      }
    } catch (error) { }
  };

  const handleVerifyOTP = () => {
    setLoading(true);
    confirmationResult
      .confirm(otp)
      .then((result) => {
        if (result.user) {
          const phoneVerify = {
            isContactVarified: "Y",
          };
          axios
            .put(`http://localhost:8080/api/profile/${userId}`, phoneVerify)
            .then((res) => {
              if (res.data.success) {
                setLoading(false);
                setOtp("");
                if(phone){
                  localStorage.setItem("stepper", 2);
                  setStep(2);
                }
                
                
                if(mobile){
                  const tokenData = localStorage.getItem("mapmyskill-token")
                  if(tokenData){
                    navigate("/myaccount/dashboard")
                    localStorage.removeItem("user_Info")
                  }
                }
                
              }
            });
        }
      })
      .catch((error) => { });
  };

  const handleResendOTp = async (phoneNumber) => {
    setOtp("");
    try {
      const response = await setUpReCaptcha(phoneNumber);
      console.log(response);
      setConfirmationResult(response);
    } catch (error) { }
  };

  const handlePhoneChange = (e) => {
    setPhoneValue(e.target.value);
  };

  const handleUpdateNumber = () => {
    const numberArray = phoneValue.split(" ");
    const isdcode = numberArray[0];
    const mobile = numberArray[1].replace(/[-+]/g, "");

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(mobile)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Phone Number",
      });
      return;
    }

    axios
      .put(`http://localhost:8080/api/users/updateMobileEmail/${userId}`, {
        mobile: mobile,
      })
      .then((res) => {
        if (res.data.success) {
          const phoneUpdate = {
            primaryContact: mobile,
            isContactVarified: "N",
          };
          axios
            .put(`http://localhost:8080/api/profile/${userId}`, phoneUpdate)
            .then((res) => {
              if (res.data.success) {
                console.log(res);
                const userInfo = JSON.parse(localStorage.getItem("user_Info"));
                console.log(userInfo, res.data.data);
                userInfo.numberPhone = isdcode + res.data?.data?.primaryContact;
                localStorage.setItem("user_Info", JSON.stringify(userInfo));
                setRefetch(!refetch);
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Your Number has been updated",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        }
      });
  };

  return (
    <div className="relative">
      <h2 className="text-center mb-6 text-[#1976D2]  text-xl">Phone Verify</h2>
      {isShowOtpInput ? (
        <div>
          <p className="text-center text-green-600">
            We have sent an OTp to your mobile phone. <br /> Please enter the
            OTP to verify
          </p>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            containerStyle="flex items-center my-6 justify-center"
            inputStyle="border-2 p-0.5 border-[#1976D2] !w-[40px] !h-[40px] rounded-md text-2xl"
            renderSeparator={<span className="text-2xl">-</span>}
            renderInput={(props) => <input {...props} />}
          />
          <div>
            <p className="text-center">
              Didn't receive the OTP ?{" "}
              <button
                onClick={() => handleResendOTp(phone)}
                type="button"
                className="text-red-400"
              >
                Resend OTP
              </button>
            </p>
          </div>

          <div className="text-center space-y-2 mt-4">
            <Button
              className="w-full"
              onClick={() => setShowOtpInput(!isShowOtpInput)}
              variant="contained"
            >
              Edit Number
            </Button>
            <Button
              onClick={handleVerifyOTP}
              className="w-full"
              variant="contained"
            >
              Verify
            </Button>
          </div>
          <div id="recaptcha-container"></div>
        </div>
      ) : (
        <form onSubmit={handleSendOtp}>
          <div className="flex items-center gap-3 justify-between">
            <PhoneInput
              onBlur={handlePhoneChange}
              inputProps={{
                name: "mobile",
                required: true,
                autoFocus: true,
                className:
                  "border-[#909090] ps-16 outline-none border-t-0 border-r-0 border-l-0 text-lg border-none  w-full rounded-lg border-[#1976D2] w-full py-1 rounded-none ",
              }}
              placeholder="Enter Mobile"
              specialLabel=""
              value={phone ? phone : mobile }
              className="border hover:border-b-2 hover:border-black  border-[#909090] w-full outline-none border-t-0 border-r-0 border-l-0 rounded "
              country={"in"}
              onlyCountries={["in"]}
            />
            <Button type="submit" className="shrink-0 " variant="contained">
              Send OTP
            </Button>
          </div>
          <div id="recaptcha-container"></div>
          <div className=" mt-3">
            <Button
              onClick={handleUpdateNumber}
              type="button"
              variant="contained"
            >
              Update Number
            </Button>
          </div>
        </form>
      )}
      <LoadingProgress isLoading={isLoading}></LoadingProgress>
    </div>
  );
};

export default PhoneVerifyCard;
import React, { useContext, useEffect, useState } from "react";
import "./SignUp.css";
import message from "../../../assets/images/message.gif";
import SignUpRoleCard from "../../../components/SignUpRoleCard/SignUpRoleCard";
import StepperForm from "./StepperForm/StepperForm";
import { useSearchParams } from "react-router-dom";
import { StepperProvider } from "../../../Providers/ShowSteperProvider";
import axios from "axios";
import { StepperFormNameProvider } from "../../../Providers/FormStepNameProvider";

const SignUp = () => {
  const [roleId, setRoleId] = useState(0);
  const [showStep, setShowStep] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { step, setStep } = useContext(StepperProvider);
  const [stepperValue, setStepperValue] = useState(
    localStorage.getItem("stepper")
  );
  const { stepperName, setStepperName, stepsDefaultName } = useContext(
    StepperFormNameProvider
  );

  const handleRoleForm = (roleId) => {
    if (roleId == 4) {
      const studentStepperName = [
        ...stepsDefaultName,
        "Contact Information",
        "Hire a Tutor / Trainer",
      ];
      setStepperName(studentStepperName);
    } else if (roleId == 3) {
      const teacherStepperName = [
        ...stepsDefaultName,
        "Proficiency",
        "Qualification",
        "Contact Information",
      ];
      setStepperName(teacherStepperName);
    }

    localStorage.setItem("roleId", JSON.stringify(roleId));
    setRoleId(roleId);
    setShowStep(true);
  };

  useEffect(() => {
    const stepper = localStorage.getItem("stepper");
    const roleId = localStorage.getItem("roleId");
    if (stepper) {
      const parseRoleId = JSON.parse(roleId);

      if (parseRoleId == 4) {
        const studentStepperName = [
          ...stepsDefaultName,
          "Contact Information",
          "Hire a Tutor / Trainer",
        ];
        setStepperName(studentStepperName);
      } else if (parseRoleId == 3) {
        const teacherStepperName = [
          ...stepsDefaultName,
          "Proficiency",
          "Qualification",
          "Contact Information",
        ];
        setStepperName(teacherStepperName);
      }

      const parseStepper = JSON.parse(stepper);
      setShowStep(true);
      setStep(parseStepper);
    } else {
      console.log("not found");
    }
  }, [stepperValue]);

  //verify email to redirect next page (todo//: it's not best way, please replace with nodemailer)
  useEffect(() => {
    const isEmailVerify = searchParams.get("email");
    if (isEmailVerify == "true") {
      const userInfoStore = localStorage.getItem("user_Info");
      const userInfo = JSON.parse(userInfoStore);
      if (userInfoStore) {
        const EmailVerify = {
          emailId: userInfo?.email,
          isEmailVarified: "Y",
        };
        axios
          .put(
           ` http://localhost:8080/api/profile/${userInfo?.userID}`,
            EmailVerify
          )
          .then((res) => {
            if (res.data.success) {
              localStorage.setItem("stepper", 2);
              setStep(2);
              setShowStep(true);
            }
          });
      }
    }
  }, [setSearchParams]);

  return (
    <div className="containerCl">
      <div className=" mt-18 containerCl">
        {showStep ? (
          <StepperForm roleId={roleId}></StepperForm>
        ) : (
          <>
            <h1 className=" text-[#198dc2] text-center text-2xl font-semibold mt-12">
              Lets Get Onboard
            </h1>
            <div className="grid md:grid-cols-3 grid-cols-1 mt-8 border-b-2 border-t-2">
              <SignUpRoleCard
                sideBorder={true}
                image={message}
                title="Students and Parents"
                para="Discover amazing teachers, post tuition jobs, take enriching courses"
                buttonText="Request tutor"
                roleId={4}
                handleRoleForm={handleRoleForm}
              ></SignUpRoleCard>
              <SignUpRoleCard
                sideBorder={true}
                image={message}
                title="Tutors & Trainers"
                para="Find tuition jobs, build your teaching career, teach online courses"
                buttonText="Signup"
                handleRoleForm={handleRoleForm}
                roleId={3}
              ></SignUpRoleCard>
              <SignUpRoleCard
                image={message}
                title="Centres & Training Institutes"
                para="Get students, sell your courses, launch online tutoring, grow your business"
                buttonText="Signup"
                handleRoleForm={handleRoleForm}
                roleId={5}
              ></SignUpRoleCard>
            </div>
            <div className="mt-8 mb-12">
              <h1 className="text-center text-2xl font-semibold mt-8">
                Already have an account ?{" "}
                <span className="text-[#198dc2] cursor-pointer hover:text-green-600 duration-300">
                  Login here
                </span>
              </h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
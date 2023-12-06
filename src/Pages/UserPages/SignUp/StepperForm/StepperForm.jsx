import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SignUpForm from "../../../../Shared/SignUpForm/SignUpForm";
import VerificationForm from "../VerificationForm/VerificationForm";
import ProfileDetailsForm from "../ProfileDetailsForm/ProfileDetailsForm";
import { StepperProvider } from "../../../../Providers/ShowSteperProvider";
import { StepperFormNameProvider } from "../../../../Providers/FormStepNameProvider";
// const steps = [
//   "Create An Account(it's free)",
//   "Verification",
//   "Proficiency",
//   "Qualification",
//   "Contact Information",
// ];

const StepperForm = ({ roleId }) => {
  const { step, setStep } = useContext(StepperProvider);
  const { stepperName, setStepperName } = useContext(StepperFormNameProvider);
  return (
    <div>
      <div className="progress-bar mt-12">
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={step} alternativeLabel>
            {stepperName.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
      <div>
        {step == 0 ? (
          <SignUpForm roleId={roleId}></SignUpForm>
        ) : step == 1 ? (
          <VerificationForm></VerificationForm>
        ) : (
          <ProfileDetailsForm roleId={roleId}></ProfileDetailsForm>
        )}
      </div>
    </div>
  );
};

export default StepperForm;

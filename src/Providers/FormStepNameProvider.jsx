import React, { createContext, useState } from "react";

export const StepperFormNameProvider = createContext(null);

const stepsDefaultName = [
  "Create An Account(it's free)",
  "Verification",
];

const FormStepNameProvider = ({ children }) => {
  const [stepperName, setStepperName] = useState([]);
  const stepperNameValue = {
    stepperName,
    setStepperName,
    stepsDefaultName
  };
  return (
    <StepperFormNameProvider.Provider value={stepperNameValue}>
      {children}
    </StepperFormNameProvider.Provider>
  );
};

export default FormStepNameProvider;

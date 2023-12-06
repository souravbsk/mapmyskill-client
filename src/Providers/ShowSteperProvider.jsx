import React, { createContext, useState } from "react";

export const StepperProvider = createContext(null);
const ShowStepperProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  const stepValue = {
    step,
    setStep,
  };
  return (
    <StepperProvider.Provider value={stepValue}>
      {children}
    </StepperProvider.Provider>
  );
};

export default ShowStepperProvider;

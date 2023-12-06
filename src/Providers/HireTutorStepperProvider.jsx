import React, { createContext, useEffect, useState } from "react";

export const ReqStepperProvider = createContext(null);


const HireTutorStepperProvider = ({ children }) => {

  const [step, setStep] = useState(0);
  useEffect(() => {
    setStep(0)
  }, [])
  const stepValue = {
    step,
    setStep,
  };
  return (
    <ReqStepperProvider.Provider value={stepValue}>
      {children}
    </ReqStepperProvider.Provider>
  );
};

export default HireTutorStepperProvider;

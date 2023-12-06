import React, { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { StepperProvider } from "../../Providers/ShowSteperProvider";
const BackButton = () => {
  const { step, setStep } = useContext(StepperProvider);

  const handleBackButton = () => {
    const stepValue = step - 1;
    setStep(stepValue);
    localStorage.setItem("stepper", stepValue);
  };
  return (
    <div>
      <button
        onClick={handleBackButton}
        className="bg-blue-500 text-white py-1 pl-2 pr-4"
      >
        <ArrowBackIcon className="text-white text-bold text-5xl"></ArrowBackIcon>
        Previous
      </button>
    </div>
  );
};

export default BackButton;

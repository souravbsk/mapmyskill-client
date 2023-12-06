import React, { useContext } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { StepperProvider } from "../../Providers/ShowSteperProvider";
const NextButton = (clickNextHandler) => {
  const { step, setStep } = useContext(StepperProvider);

  const handleNextButton = () => {
    const stepValue = step + 1;
    setStep(stepValue);
    localStorage.setItem("stepper", stepValue);
  };

  return (
    <div>
      <button
        onClick={handleNextButton}
        className="bg-blue-500 text-white py-1 pl-4 pr-2"
      >
        Next{" "}
        <ArrowForwardIcon className="text-white text-bold text-5xl"></ArrowForwardIcon>
      </button>
    </div>
  );
};

export default NextButton;

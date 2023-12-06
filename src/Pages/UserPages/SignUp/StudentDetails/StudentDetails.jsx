import React from "react";
import { useContext } from "react";
import { StepperProvider } from "../../../../Providers/ShowSteperProvider";
import StudentContact from "../../../../components/StudentProfileForms/StudentContact/StudentContact";
import StudentHireTutor from "../../../../components/StudentProfileForms/StudentHireAndTutor/StudentHireTutor";

const StudentDetails = () => {
  const { step, setStep } = useContext(StepperProvider);

  return (
    <>
      {step == 2 ? (
        <StudentContact></StudentContact>
      ) : step == 3 ? (
        <StudentHireTutor></StudentHireTutor>
      ) : (
        ""
      )}
    </>
  );
};

export default StudentDetails;

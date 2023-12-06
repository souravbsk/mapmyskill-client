import React, { useContext } from "react";
import TeachingExperience from "../../../../components/TeacherProfileForms/TeachingExperience/TeachingExperience";
import TeachingQualification from "../../../../components/TeacherProfileForms/TeacherQualification/TeachingQualification";
import { StepperProvider } from "../../../../Providers/ShowSteperProvider";
import TeacherContacts from "../../../../components/TeacherProfileForms/TeacherContacts/TeacherContacts";
const TeacherDetails = () => {
  const { step, setStep } = useContext(StepperProvider);

  return (
    <div>
      {step == 2 ? (
        <TeachingExperience></TeachingExperience>
      ) : step == 3 ? (
        <TeachingQualification></TeachingQualification>
      ) : step == 4 ? (
        <TeacherContacts></TeacherContacts>
      ) : (
        ""
      )}
    </div>
  );
};

export default TeacherDetails;

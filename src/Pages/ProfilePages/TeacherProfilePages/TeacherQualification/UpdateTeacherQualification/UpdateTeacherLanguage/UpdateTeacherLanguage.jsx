import Multiselect from "multiselect-react-dropdown";
import React, { useState } from "react";
import useFetchValue from "../../../../../../Hooks/useFetchValue";

const UpdateTeacherLanguage = ({ defaultLang,setTeachingLanguage, setdefaultLang }) => {
  const { getValue: languageData } = useFetchValue("language");

  //console.log(defaultLang, "defaultlang");
  const handleOnselect = (teacherLanguage) => {
   //console.log(teacherLanguage);
    setTeachingLanguage(teacherLanguage.map((item) => {
      if(!item?.id){
        item.dbstatus = "i"
      }
      return item
    }));
  };
  const handleOnRemove = (teacherLanguage) => {
    const removeItem = teacherLanguage.map((item) => item);
    setTeachingLanguage(removeItem);
  };
  return (
    <div>
      <Multiselect
        displayValue={"listItemName"}
        isObject={true}
        selectedValues={defaultLang}
        onSelect={(teacherLanguage) => handleOnselect(teacherLanguage)}
        onRemove={(teacherLanguage) => handleOnRemove(teacherLanguage)}
        options={languageData}
        placeholder="Select Languages Known"
        showArrow={true}
      />
    </div>
  );
};

export default UpdateTeacherLanguage;

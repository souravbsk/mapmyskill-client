import Multiselect from "multiselect-react-dropdown";
import React, { useState } from "react";
import "./MultiSelectField.css";

const MultiSelectField = ({
  displayValue,
  defaultPlaceHolder,
  items,
  handleMultiSelect,
  ismultiselect,
  setmultiselect,
  defaultValue,
}) => {
  return (
    <Multiselect
      displayValue={displayValue}
      isObject={true}
      onSelect={(multiSelectItems) => handleMultiSelect(multiSelectItems)}
      onRemove={(multiSelectItems) => handleMultiSelect(multiSelectItems)}
      options={items}
      placeholder={ismultiselect ? defaultPlaceHolder : "add more.."}
      showArrow={true}
      selectedValues={defaultValue}
    />
  );
};

export default MultiSelectField;

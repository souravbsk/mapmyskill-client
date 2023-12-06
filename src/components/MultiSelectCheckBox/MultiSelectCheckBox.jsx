import React, { useState } from "react";

function MultiSelectCheckBox({ options }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  console.log(selectedOptions);
  const handleCheckboxChange = (event) => {
    const optionId = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedOptions([...selectedOptions, optionId]);
    } else {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
    }
  };

  return (
    <div>
      <h2>Select Options:</h2>
      <form>
        {options?.map((option) => (
          <label key={option.subjectid}>
            <input
              type="checkbox"
              value={option.subjectid}
              checked={selectedOptions.includes(option.subjectid)}
              onChange={handleCheckboxChange}
            />
            {option.name}
          </label>
        ))}
      </form>
    </div>
  );
}

export default MultiSelectCheckBox;

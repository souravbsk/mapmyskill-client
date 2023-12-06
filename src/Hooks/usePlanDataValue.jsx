import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const usePlanDataValue = (itemName) => {
  const [itemValue, setItemValue] = useState(null);
  useEffect(() => {
    fetch("/planData.json")
      .then((res) => res.json())
      .then((data) => {
        const dataValue = data.find(
          (item) => item?.name.toLowerCase() == itemName.toLowerCase()
        );
        setItemValue(dataValue?.value);
      });
  }, []);

  return { itemValue, setItemValue };
};

export default usePlanDataValue;

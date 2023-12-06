import React, { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import "./ReactSearchcomplete.css";

const ReactSearchcomplete = ({
  handleOnSelect,
  handleOnSearch,
  handleOnFocus,
  index,
  allItems,
  placeholder,
  thirdParameter,
}) => {
  const items = allItems.map((item) => {
    const allIndividualItems = {
      id: item.listItemId,
      name: item.listItemName,
    };
    return allIndividualItems;
  });

  const allIndividualItems = {
    id: 1,
    name: "helo",
  };
  return (
    <ReactSearchAutocomplete
      items={items}
      placeholder={placeholder}
      onSearch={handleOnSearch}
      onSelect={(items) => handleOnSelect(index, items, thirdParameter)}
      onFocus={handleOnFocus}
      autoFocus
      showIcon={false}
    ></ReactSearchAutocomplete>
  );
};

export default ReactSearchcomplete;

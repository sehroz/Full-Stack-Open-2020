import React from "react";

const Filter = ({ filterInput, handleFilter }) => {
  return (
    <div>
      filter shown with <input value={filterInput} onChange={handleFilter} />
    </div>
  );
};

export default Filter;

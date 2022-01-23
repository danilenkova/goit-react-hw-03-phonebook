import React from "react";
import PropTypes from "prop-types";
import { FilterLabel, FilterField, FilterInput } from "./Filter.styled";

const Filter = ({ text, onChange }) => {
  return (
    <FilterLabel>
      <FilterField>Find contacts by name</FilterField>
      <FilterInput
        type="text"
        name="filter"
        onChange={onChange}
        value={text}
        placeholder="Enter name"
        autoComplete="off"
      ></FilterInput>
    </FilterLabel>
  );
};

Filter.propTypes = {
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;

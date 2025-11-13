import React from "react";
import Select, { components } from "react-select";

const BranchFilter = ({ options, selectedOptions, onChange }) => {
  const Option = (props) => (
    <components.Option {...props}>
      <input
        type="checkbox"
        checked={props.isSelected}
        onChange={() => null}
        style={{ marginRight: 8 }}
      />
      <label>{props.label}</label>
    </components.Option>
  );

  return (
    <div style={{ width: 360, minWidth: 220 }}>
    <p className="mb-1">Select Branch to compare</p>
    <Select
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      components={{ Option }}
      options={options}
      value={selectedOptions}
      onChange={onChange}
      placeholder="Select Branch to compare"
      classNamePrefix="branch-select"
      styles={{
        control: (base) => ({
          ...base,
        //   width: "360px",
          minHeight: "40px",
          maxHeight: "50px",
          overflowY: "auto",
          whiteSpace: "normal",
        }),
        valueContainer: (base) => ({
          ...base,
          display: "flex",
          flexDirection: "column", // stack selected items vertically
          overflow: "auto", // scroll vertically
          maxHeight: "50px",
        }),
        multiValue: (base) => ({
          ...base,
          flex: "0 0 auto",
          marginBottom: 2,
        }),
        menu: (provided) => ({
          ...provided,
          zIndex: 9999,
        }),
      }}
    />
    </div>
  );
};

export default BranchFilter;

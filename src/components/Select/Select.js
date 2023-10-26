/**
 * React Imports
 */
import React from "react";
import Select, { components } from "react-select";
import CreatableSelect from "react-select/creatable";
import { Icon } from "rsuite";

/**
 * Custom Imports
 */
import "../Select/SelectStyle.css";

//Customized styled based on the package
const customStyles = {
  input: (provided, state) => ({
    ...provided,
    color: "#fff",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "#fff",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "#fff",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "#fff",
    ":hover": {
      color: "white",
    },
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    color: "#fff",
    ":hover": {
      color: "white",
    },
  }),
  control: (provided, state) => ({
    ...provided,
    border: "1px solid #3f6ad8",
    backgroundColor: "#3f6ad8",
    color: "#fff",
  }),
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: "#fff",
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    color: "#000",
  }),
  menu: (provided) => ({ ...provided, zIndex: 1111 }),
};
const LabelStyle = {
   marginBottom: 0,
   fontSize: '14px',
   fontWeight:'500',
   textTransform:'capitalize'
}
/**
 * Custom select component
 * @param {Object} props
 */
const CustomSelect = (props) => {
  /**
   * Search Icon for Select
   * @param {Object} props
   */
  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <Icon icon="search" />
        </components.DropdownIndicator>
      )
    );
  };;
  return (
    <>
      {props.showLabel && (
        <div>
          <label style={LabelStyle}>{props?.label || 'Select'}</label>
        </div>
      )}
      <Select
        {...props}
        className="basic-single"
        classNamePrefix="select"
        onChange={(options) => {
          props.onSelect(options);
        }}
        isSearchable={props.search}
        options={props.data}
        components={props.search && { DropdownIndicator }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            //neutral80: "#fff",
            neutral30: "#fff",
            neutral40: "#fff",
            neutral50: "#fff",
          },
        })}
        styles={customStyles}
      />
    </>
  );
};

export default CustomSelect;

/**
 * Creative new dropdown item
 * @param {Object} props
 */
export const CustomCreatable = (props) => {
  return (
    <CreatableSelect
      {...props}
      onChange={(options) => {
        props.onSelect(options);
      }}
      options={props.data}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          //neutral80: "#fff",
          neutral30: "#fff",
          neutral40: "#fff",
          neutral50: "#fff",
        },
      })}
      styles={customStyles}
    />
  );
};

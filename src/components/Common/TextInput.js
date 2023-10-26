/**
 * React Imports
 */
import React from "react";

/**
 * Customised text input
 * @param {Object} props
 */
const TextInput = (props) => {
  return (
    <div className={props.divClass}>
      <label htmlFor={props.id} className={props.labelClass}>
        {props.labelName}
      </label>
      <input
        {...props}
        name={props.id}
        className={props.inputClass}
        onChange={(e) => props.onChange(e)}
      />
    </div>
  );
};

export default TextInput;

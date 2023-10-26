/*
React Imports
 */
import React from "react";

/**
 * Error Page if there are any errors
 * @param {Object} props
 */
const Error = (props) => {
  return (
    <div className="row m-4">
      <div
        className="col-12 d-flex justify-content-center align-items-center"
        style={{ padding: "50px", backgroundColor: "white" }}
      >
        <h3 style={{ color: "red" }}>{props.msg}</h3>
      </div>
    </div>
  );
};

export default Error;

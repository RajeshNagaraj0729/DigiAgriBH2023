import React from "react";

const Error = (props) => {
  return (
    <div className="col-12 d-flex align-items-center justify-content-center">
      <div style={{ color: "red", padding: "30px", backgroundColor: "white" }}>
        {props.msg}
      </div>
    </div>
  );
};

export default Error;

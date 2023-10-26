// React imports
import React from "react";

//Custom imports
import "./NoDataFound.css";

/**
 * component for no data found display
 * @param {props} props
 */
const NoDataFound = (props) => {
  return (
    <div className="d-flex align-items-center justify-content-center col-12 nodata">
      {props.msg}
    </div>
  );
};

export default NoDataFound;

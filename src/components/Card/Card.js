/**
 * React Imports
 */
import React from "react";
import { Spinner } from "reactstrap";

/**
 * Card component for displaying count
 * @param {Object} props
 */
const Card = (props) => {
  return (
    <div
      className={"diseaseWithCard diseaseCardSec cardShadow " + props.cardStyle}
      style={{ height: "80px" }}
    >
      <div className="diseaseCardSecLeft">
        <h6 className={"diseaseCardHeading " + props.cardHeadingStyle}>
          {props.cardHeading}
        </h6>
        <p className={"diseaseCardTxt " + props.cardTextStyle}>
          {props.cardText}
        </p>
      </div>
      <div
        className={
          "d-flex align-items-center diseaseCardSecRight numbrCount " +
          props.numberStyle
        }
      >
        {props.isLoading ? (
          <Spinner
            style={{ width: "1.5rem", height: "1.5rem", fontSize: "1rem" }}
            size="sm"
          />
        ) : (
          props.number
        )}
      </div>
    </div>
  );
};
export default Card;

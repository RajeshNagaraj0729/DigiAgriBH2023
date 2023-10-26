import React from "react";
import Carousel from "react-bootstrap/Carousel";

const CustomCarousel = (props) => {
  return (
    <Carousel>
      {props.data?.map((r) => (
        <Carousel.Item>
          <img className="d-block w-100" src={r} alt="Not Uploaded" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;

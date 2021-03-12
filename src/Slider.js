import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { Box } from "@material-ui/core";
import { SliderImages } from "./images/slider";

export default function Slider() {
  return (
    <Carousel>
      {SliderImages.map((image, i) => (
        <Box key={i}>
          <Box component='img' src={image} />
          <p className='legend'>Legend {i + 1}</p>
        </Box>
      ))}
    </Carousel>
  );
}

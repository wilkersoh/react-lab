import React from "react";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Container from "./components/Container";
import { SliderImages } from "./images/slider";

export default function MediumImageZoom() {
  return (
    <Container>
      <Typography variant={"h2"} gutterBottom>
        Default
      </Typography>
      <Zoom>
        <Box component={"img"} src={SliderImages[0]} width={300} />
      </Zoom>

      <Typography variant={"h2"} gutterBottom>
        Background, zoomMargin and openText
      </Typography>
      <Zoom
        overlayBgColorEnd={"#ec3a3a"}
        zoomMargin={20}
        closeText='Test typing something with long text'
        openText='Test typing something with long text'>
        <Box component={"img"} src={SliderImages[0]} width={300} />
      </Zoom>

      <Box>
        You can zoom anything, so <Box component='code'>picture</Box>,{" "}
        <Box component='code'>figure</Box>, and even{" "}
        <Box component='code'>div</Box> elements are all valid:
      </Box>

      <Typography variant={"h2"} gutterBottom>
        Picture
      </Typography>
      <Zoom>
        <picture>
          <source media='(max-width: 800px)' srcSet={SliderImages[1]} />
          <img alt='that wanaka tree' src={SliderImages[1]} width='500' />
        </picture>
      </Zoom>

      <Typography variant={"h2"} gutterBottom>
        Div
      </Typography>
      <Zoom>
        <div
          aria-label='A blue circle'
          style={{
            width: 300,
            height: 300,
            borderRadius: "50%",
            backgroundColor: "#0099ff",
          }}
        />
      </Zoom>
    </Container>
  );
}

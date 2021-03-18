import React, { useState } from "react";

import Container from "./components/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { SliderImages } from "./images/slider";

const useStyles = makeStyles(() => ({
  container: {
    display: "inline-block",
    backgroundColor: `rgba(242, 242, 242, 1)`,
    // border: "2px solid red",
    width: "300px",
  },
  image: {
    display: "block",
    objectPosition: "center",
    cursor: "pointer",
    objectFit: "contain",
    width: "100%",
    transition: "1000ms ease-in-out",
    transformOrigin: "left",
    // width: "300px",
    // transform: ({x, y, scale}) => `scale() translate(calcToMiddle, calcToMiddle)`,
    "&.animation": {
      position: "absolute",
      transform: `scale(1) translateY(241px)`,
      // width: (props) => props.width,
      // top: (props) => props.top,
    },
  },
}));

export default function ImageTransitionZoom() {
  const [isShow, setIsShow] = useState({
    status: false,
    width: 0,
    scale: 0,
    top: 0,
    x: 0,
    y: 0,
  });

  const classes = useStyles(isShow);
  /**
   * transform: scale() translate(calcToMiddle, calcToMiddle)
   */
  const onClickImage = (e) => {
    const rect = e.target.getBoundingClientRect();
    const screenW = e.view.screen.width;
    const screenH = e.view.screen.height;
    const centerH = screenH / 2 - rect.height / 2;

    console.log("centerH :>> ", centerH);
    console.log("screenH :>> ", screenH);
    // Calc image scale

    setIsShow({ status: !isShow.status, width: screenW, top: centerH });
  };

  return (
    <Container>
      <Box className={classes.container}>
        <Box
          onClick={onClickImage}
          className={classes.image + (isShow.status ? " animation" : "")}
          component={"img"}
          src={SliderImages[0]}
        />
      </Box>
    </Container>
  );
}

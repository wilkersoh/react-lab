import React, { useState, useEffect, useRef } from "react";
import { SliderImages } from "./images/slider";
import Container from "./components/Container";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(() => ({
  image: {
    width: "300px", // image size ratio is 3 / 2;
    height: "200px", // image size ratio is 3 / 2;
    backgroundColor: "black",
    backgroundImage: `url(${SliderImages[0]})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    "&[zoomed]": {
      backgroundSize: "600px 400px", // zoomed 1 level
      backgroundPosition: (props) =>
        `calc(${props.x} * 100%) calc(${props.y} * 100%)`,
    },
    "&:hover": {
      cursor: "zoom-in",
    },
  },
}));

export default function MouseMoveZoom() {
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef();
  const classes = useStyle(zoomPosition);

  useEffect(() => {
    //
    const element = imageRef.current;
    const events = {
      mouseenter: enterHandle,
      mousemove: moveHandle,
      mouseleave: leaveHandle,
      // mobile version
      touchstart: enterHandle,
      touchmove: moveHandle,
      touchend: leaveHandle,
    };

    for (const key in events) {
      element.addEventListener(key, events[key]);
    }

    return () => {
      for (const key in events) {
        element.addEventListener(key, events[key]);
      }
    };
  }, []);

  const enterHandle = (e) => {
    e.target.setAttribute("zoomed", 1);

    moveHandle(e);
  };

  const moveHandle = (e) => {
    let rect = e.target.getBoundingClientRect();
    let offsetX, offsetY;

    if (["touchstart", "touchmove", "touchend"].includes(e.type)) {
      // mobile touch value
      /**
       * Test in laptop, 3 finger move is work.
       */
      offsetX = e.touches[0]?.pageX - rect.left;
      offsetY = e.touches[0]?.pageY - rect.top;

      e.preventDefault();
    } else {
      offsetX = e.offsetX;
      offsetY = e.offsetY;
    }

    let x = offsetX / rect.width;
    let y = offsetY / rect.height;

    setZoomPosition({ x, y });
  };

  const leaveHandle = (e) => {
    e.target.removeAttribute("zoomed", 1);

    moveHandle(e);
  };

  return (
    <Container>
      <Box className='blue'>
        <Box ref={imageRef} className={classes.image}></Box>
      </Box>
    </Container>
  );
}

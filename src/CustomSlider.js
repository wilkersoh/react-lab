import React, { useState, useEffect, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { SliderImages } from "./images/slider";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { Box } from "@material-ui/core";

import "./styles/SliderImage.css";
import Container from "./components/Container";

const useStyles = makeStyles((theme) => ({
  slider: {
    position: "relative",
    margin: "0 auto",
    overflow: "hidden",
    border: "2px dashed black",
    backgroundColor: "black",
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
  },
  sliderContent: {
    transform: (props) => `translate3d(-${props.transform}%, 0, 0)`, // use 3d instead of translateX
    transition: (props) => `transform ease-out ${props.transition}s`,
    height: "100%",
    display: "flex",
  },
}));

export default function CustomSlider() {
  const containerRef = useRef();
  const [activeIndex, setActiveIndex] = useState({
    transform: 0,
    width: 0,
  });

  const classes = useStyles({
    transform: activeIndex.transform * 100,
    transition: 0.45,
  });

  const nextSlide = () => {
    if (activeIndex.transform === SliderImages.length - 1) return;
    setActiveIndex({ ...activeIndex, transform: activeIndex.transform + 1 });
  };

  const prevSlide = () => {
    if (activeIndex.transform === 0) return;
    setActiveIndex({ ...activeIndex, transform: activeIndex.transform - 1 });
  };

  const onClickDot = (number) => {
    setActiveIndex({ ...activeIndex, transform: number });
  };

  return (
    <Container d='flex' flex={1} height='400px' width='100%'>
      <Box className={classes.slider}>
        <Box
          component='ul'
          className={classes.sliderContent}
          ref={containerRef}>
          {SliderImages.map((image, i) => (
            <Box
              component={"img"}
              key={i}
              src={image}
              style={{ objectFit: "contain", width: "100%", flexShrink: 1 }}
            />
          ))}
        </Box>
        <Arrow direction={"left"} handleOnClick={prevSlide} />
        <Arrow direction={"right"} handleOnClick={nextSlide} />
        <Dots
          onClick={onClickDot}
          slides={SliderImages}
          activeIndex={activeIndex.transform}
        />
      </Box>
    </Container>
  );
}

const Arrow = ({ direction, handleOnClick }) => {
  if (direction === "right")
    return (
      <Box
        position='absolute'
        right={0}
        top='50%'
        style={{ transform: "translateY(-50%)" }}
        zIndex='1'
        onClick={handleOnClick}>
        <ArrowForward />
      </Box>
    );

  return (
    <Box
      position='absolute'
      left={0}
      top='50%'
      style={{ transform: "translateY(-50%)" }}
      zIndex='1'
      onClick={handleOnClick}>
      <ArrowBack />
    </Box>
  );
};

const Dots = ({ slides, activeIndex, onClick }) => {
  return (
    <Box
      display='flex'
      position='absolute'
      left='50%'
      bottom='1rem'
      style={{ transform: "translateX(-50%)" }}>
      {slides.map((_, i) => (
        <Box
          key={i}
          onClick={() => onClick(i)}
          bgcolor={activeIndex === i ? "black" : "transparent"}
          mx={1}
          width='18px'
          height='18px'
          borderRadius='50%'
          border='2px solid black'></Box>
      ))}
    </Box>
  );
};

import React, { useState, useEffect, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { SliderImages } from "./images/slider";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { Box } from "@material-ui/core";

import "./styles/SliderImage.css";
import Container from "./components/Container";

const useStyles = makeStyles({
  slider: {
    position: "relative",
    height: "100%",
    width: "100%",
    margin: "0 auto",
    overflow: "hidden",
  },
  sliderContent: {
    transform: (props) => `translateX(-${props.transform}px)`,
    transition: (props) => `transform ease-out ${props.transition}s`,
    // width: (props) => `${props.width}px`,
    height: "100%",
    display: "flex",
  },
});

export default function Slider() {
  const containerRef = useRef();
  const [activeIndex, setActiveIndex] = useState({
    transform: 0,
    width: 0,
  });

  // const getWidth = () => window.innerWidth;
  let resizeWindow = () => {
    setActiveIndex({
      ...activeIndex,
      width: containerRef.current.offsetWidth,
    });
  };

  useEffect(() => {
    // get slide container width
    const width = containerRef.current.offsetWidth;

    setActiveIndex({ ...activeIndex, width });

    resizeWindow();

    console.log("activeIndex :>> ", activeIndex);

    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  const classes = useStyles({
    // transform: activeIndex.transform * getWidth(),
    transform: activeIndex.transform * activeIndex.width,
    transition: 0.45,
    // width: getWidth() * SliderImages.length,
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
        <Box className={classes.sliderContent} ref={containerRef}>
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

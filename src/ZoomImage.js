import React, { useState, useRef, useEffect } from "react";
import Container from "./components/Container";
import { SliderImages } from "./images/slider";

import { makeStyles } from "@material-ui/core/styles";
import { Box, CircularProgress } from "@material-ui/core";

export default function ZoomImage() {
  const [preview, setPreview] = useState({ image: null, status: false });

  const onPreviewImage = (event) => {
    let src;
    if (typeof event === "function") {
      // cb function from PreviewImage Component
      event(false);
    } else {
      src = event.target.src;
    }

    // found location

    if (!src) src = null;
    setPreview({ image: src, status: !preview.status });
    // transition to center
  };

  return (
    <>
      <Container>
        <Box component={"ul"}>
          <Box
            component={"li"}
            display='inline-block'
            bgcolor='black'
            style={{ cursor: "zoom-in" }}>
            <Box display='flex'>
              <Box
                component={"img"}
                m='auto'
                onClick={(e) => onPreviewImage(e)}
                src={SliderImages[0]}
                width='200px'
              />
            </Box>
          </Box>
        </Box>
      </Container>
      <PreviewImage onClick={onPreviewImage} preview={preview} />
    </>
  );
}

const PreviewImage = ({ onClick, preview }) => {
  const [onLoad, setOnLoad] = useState(false);
  const imgEl = useRef(null);
  const classes = useStyles();

  const onLoadImg = async () => {
    const delay = await new Promise((resolve) => setTimeout(resolve, 750));

    setOnLoad(true);
  };

  /**
   * Way 1:
   * useEffect and useRef to listen load event
   *
   * Way2 :
   * Use onLoad tag in img to trigger onLoadImg Function when it fully load
   */
  useEffect(() => {
    const imgElCurrent = imgEl.current;

    if (imgElCurrent) {
      imgElCurrent.addEventListener("load", onLoadImg);
      return () => imgElCurrent.removeEventListener("load", onLoadImg);
    }
  }, [imgEl]);

  return (
    <Box
      className={classes.overlay}
      onClick={() => onClick(setOnLoad)} // cb function to reset load
      display={preview.status ? "flex" : "none"}>
      {/* Loading */}
      <CircularProgress display={onLoad ? "none" : "block"} />

      <Box
        ref={imgEl}
        width='100%'
        component={"img"}
        src={preview.image}
        // transition='1050ms ease-in-out'
        display={onLoad ? "block" : "none"}
        // onLoad={onLoadImg}
      />
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.7)",
    cursor: "zoom-out",
  },
}));

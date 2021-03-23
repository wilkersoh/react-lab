import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, TextField } from "@material-ui/core";
import Container from "./Container";

const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  };

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  return keyPressed;
};

function AutoFocusTextField(props) {
  /**
   * Meterial UI TextField cannot useRef from react
   */
  const inputRef = React.useRef();
  React.useEffect(() => {
    if (!props.slashPress) return;
    const timeout = setTimeout(() => {
      inputRef.current.focus();
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [props.slashPress]);

  return <TextField inputRef={inputRef} {...props} />;
}

export default function Navbar({ onChange }) {
  const slashPress = useKeyPress("/");
  const location = useLocation();

  return (
    <Container
      display='flex'
      pt={2}
      justifyContent='space-between'
      alignItems='center'>
      <h1>React Lab</h1>
      <Box display={location.pathname === "/" ? "block" : "none"}>
        <AutoFocusTextField
          slashPress={slashPress}
          InputLabelProps={{ style: { fontSize: 14 } }}
          onChange={onChange}
          label={"search"}
          variant='outlined'
          size='small'
        />
      </Box>
      <Link to='/'>Home</Link>
    </Container>
  );
}

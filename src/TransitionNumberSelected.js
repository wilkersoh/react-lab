import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Container from "./components/Container";
import { makeStyles } from "@material-ui/core/styles";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles({
  app: {
    backgroundColor: "black",
    display: "flex",
    borderRadius: "0.2rem",
    width: "5rem",
    maxHeight: "2rem",
    overflow: "hidden",
    padding: "0.5rem 0",
    position: "relative",
    boxShadow: "0px 3px 12px rgba(0,0,0,.2)",
    "&::after": {
      content: '""', // notice this, single quoted and double
      display: "block",
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      background:
        "linear-gradient(180deg, rgba(0,0,0,.9) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,.9) 100%)", // make it fade cover in top and bottom
    },
  },
  number: {
    color: "#fff",
    display: "block",
    width: "100%",
    fontSize: "1rem",
    lineHeight: "1.1rem",
    textAlign: "center",
    transform: "translateY(-1rem)",
    "&.before": {
      transform: "translateY(0rem)",
      transition: "transform 0.2s ease-in",
    },
    "&.after": {
      transform: "translateY(-2rem)",
      transition: "transform 0.2s ease-in",
    },
    "&::before": {
      display: "block",
      content: (props) => `"${props.before}"`, // notice this, single quoted and double quoted
    },
    "&::after": {
      display: "block",
      content: (props) => `"${props.after}"`, // notice this, single quoted and double quoted
    },
  },
  button: {
    flex: "0 0 1.2rem", // to overide default Button component width
    border: 0,
    background: "none",
    color: "#fff",
    fontSize: "0.6rem",
    lineHeight: "1rem",
    padding: 0,
    margin: 0,
    width: "1rem",
    height: "1rem",
    position: "relative",
    zIndex: 2,
  },
});

export default function TransitionNumberSelected() {
  const [count, setCount] = useState({
    current: 10,
    before: 9,
    after: 11,
    isBefore: false,
    isAfter: false,
  });

  const classes = useStyles(count);

  const onClickAdd = async () => {
    setCount({ ...count, isAfter: true });

    // same as css transition time 0.2s, then reset back the className
    const _delay = await new Promise((resolve) => setTimeout(resolve, 200));

    const newCount = {
      current: count.current + 1,
      before: count.current,
      after: count.current + 2,
      isBefore: false,
    };

    setCount({ ...newCount, isAfter: false });
  };
  const onClickReduce = async () => {
    setCount({ ...count, isBefore: true });

    // same as css transition time 0.2s, then reset back the className
    const _delay = await new Promise((resolve) => setTimeout(resolve, 200));

    const newCount = {
      current: count.current - 1,
      before: count.current - 2,
      after: count.current,
      isAfter: false,
    };

    setCount({ ...newCount, isBefore: false });
  };

  return (
    <Container>
      <Box className={classes.app}>
        <IconButton onClick={onClickReduce} className={classes.button}>
          <RemoveIcon />
        </IconButton>
        <Box
          className={`${classes.number} ${count.isBefore && "before"} ${
            count.isAfter && "after"
          }`}>
          {count.current}
        </Box>
        <IconButton onClick={onClickAdd} className={classes.button}>
          <AddIcon />
        </IconButton>
      </Box>
    </Container>
  );
}

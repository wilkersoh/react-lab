import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "./components/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  box: {
    border: "2px solid blue",
    height: "100px",
    width: "100px",
    textAlign: "center",
    fontSize: "1.5rem",
    "&.active": {
      backgroundColor: "#a2a2a2",
    },
  },
});

const ROUND = 3;

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default function RunningMap() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);
  const [boxNum, setBoxNum] = React.useState(10);

  const diceNum = () => {
    if (selected.length >= boxNum) return;

    let number = Math.floor(Math.random() * boxNum);

    while (selected.includes(number) && selected.length < boxNum) {
      number = Math.floor(Math.random() * boxNum);
    }

    setSelected([...selected, number]);
    return number;
  };

  const run = async () => {
    const number = diceNum();
    const clone = [...selected];

    for (let i = 0; i < ROUND; i++) {
      for (let j = 0; j < boxNum; j++) {
        if (i === ROUND - 1 && j === number) {
          // update selected number in last round
          return setSelected([...clone, j]);
        }

        if (selected.includes(j)) continue;

        setSelected([...clone, j]);

        await sleep(150);
        setSelected([...clone]);
      }
    }
  };

  const updateNumber = (e) => {
    const number = +e.target.value;
    setBoxNum(number);
    setSelected([]);
  };
  console.log("boxNum :>> ", boxNum);
  return (
    <Container display='flex' flexDirection='column'>
      <Box display='flex' flexWrap='wrap'>
        {new Array(boxNum).fill("").map((_, i) => (
          <Box
            key={i}
            className={`${classes.box} ${selected.includes(i) && "active"}`}>
            {i + 1}
          </Box>
        ))}
      </Box>
      <Box mt={2}>
        <Button variant='outlined' onClick={run}>
          Start
        </Button>
        <Box mx={2} display='inline-block'>
          <TextField
            type='number'
            value={boxNum || null}
            label='Number'
            onChange={updateNumber}
            placeholder='Enter box number'
          />
        </Box>
      </Box>
    </Container>
  );
}

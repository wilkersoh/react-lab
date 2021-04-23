import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Container from "./components/Container";

const useStyles = makeStyles({
  container: {
    display: "flex",
    backgroundColor: "black",
    height: "300px",
    alignItems: "flex-end",
    "& .bar": {
      // height: (props) => {
      //   console.log("props: ", props.height);
      //   return props.height * 10 + "px";
      // },
      color: "#000",
      backgroundColor: "#fff",
      margin: "0 4px",
      width: "14px",
      textAlign: "center",
    },
  },
});

const swap = async (arr, a, b) => {
  await sleep(1000);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function QuickSort() {
  const initialValue = [9, 3, 4, 6, 5]; //  must set inside the function, cannot set it outside.
  const [arrNumber, setArrNumber] = useState(initialValue);

  const classes = useStyles({ height: arrNumber });

  const partition = async (arr, startIndex, endIndex) => {
    let pivotIndex = startIndex;
    let pivotValue = arr[endIndex];
    for (let i = startIndex; i < endIndex; i++) {
      /**
       * [9, 3, 4, 6, 5];
       * First: 9 < 5  = false
       * Second: 3 < 5 = true; then swap i and pivotIndex(number 9); pivotIndex + 1
       * [3, 9, 4, 6, 5];
       * current pivotIndex in index 1
       * third: 4 < 5 = true; then swap i and pivotIndex(number 9); pivotIndex + 1
       * [3, 4, 9, 6, 5];
       * current pivotIndex in index 2
       * four: 6 < 5 = false;
       * result > [3, 4, 9, 6, 5];
       * after quit this loop swap(arr, pivotIndex endIndex)
       * final > [3, 4, 5, 6, 9];
       */
      if (arr[i] < pivotValue) {
        await swap(arr, i, pivotIndex);
        pivotIndex++;
      }
    }

    await swap(arr, pivotIndex, endIndex);

    return pivotIndex;
  };

  const quickSort = async (arr, startIndex, endIndex) => {
    if (startIndex >= endIndex) {
      /**
       * start: 0
       * end: 0
       * start: 2
       * end: 1
       * start: 1
       * end: 3
       * start: 5
       * end: 4
       */
      setArrNumber([...arr]); // if straight set arr into setArrNumber, it won't trigger useEffect, must create another array
      return;
    }

    let index = await partition(arr, startIndex, endIndex);

    await Promise.all([
      quickSort(arr, startIndex, index - 1),
      quickSort(arr, index + 1, endIndex),
    ]);
  };

  const reset = () => {
    setArrNumber(initialValue);
  };

  console.log("arrNumber :>> ", arrNumber);
  return (
    <Container>
      <Box className={classes.container}>
        {arrNumber.map((number, i) => (
          <Box className={`bar`} key={i} style={{ height: number * 10 + "px" }}>
            {number}
          </Box>
        ))}
      </Box>

      <Box mt={2}>
        <Button
          onClick={() => quickSort(arrNumber, 0, arrNumber.length - 1)}
          variant='outlined'>
          Start quick sort
        </Button>
        <Button onClick={reset} variant='outlined'>
          Reset
        </Button>
      </Box>
    </Container>
  );
}

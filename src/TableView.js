import React, { useEffect, useState } from "react";

import Container from "./components/Container";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SliderImages } from "./images/slider";

const useStyles = makeStyles({
  superHeader: {
    color: "black",
    textAlign: "center",
    backgroundColor: "green",
    // border: "0",
    // cellspacing: "0",
    // cellpadding: "0",
  },
  header: {
    backgroundColor: "#4CAF50",
    color: "white",
    textAlign: "left",
  },
  body: {
    "&:nth-child(even)": {
      backgroundColor: "#f2f2f2",
    },
  },
});

let DATA_JSON = [
  { imageSrc: "", name: "bridge", quantity: 4, price: 100 },
  { imageSrc: "", name: "building", quantity: 23, price: 300 },
  { imageSrc: "", name: "cool", quantity: 123, price: 210 },
  { imageSrc: "", name: "air", quantity: 45, price: 3 },
];
export default function TableView() {
  const [data, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    let payload = [];
    for (let i = 0, length = SliderImages.length; i < length; i++) {
      const updated = { ...DATA_JSON[i], imageSrc: SliderImages[i] };
      payload = [...payload, updated];
    }
    setData(payload);
  }, []);

  if (!data.length) return <Box>Loading...</Box>;

  return (
    <Container>
      <Box component={"table"} width='100%'>
        <tr className={classes.header}>
          <th>Image</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
        {/* Top is Header */}
        {data.map(({ imageSrc, name, quantity, price }) => (
          <tr className={classes.body}>
            <Box component={"img"} src={imageSrc} width='100px' />
            <td>{name}</td>
            <td>{quantity}</td>
            <td>{price}</td>
          </tr>
        ))}
      </Box>

      <Box
        component={"table"}
        border='0'
        cellspacing='0'
        cellpadding='0'
        width='100%'
        mt={4}>
        <tr className={classes.superHeader}>
          <th colSpan={4}>Table List</th>
        </tr>
        <tr className={classes.header}>
          <th>Image</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
        {/* Top is Header */}
        {data.map(({ imageSrc, name, quantity, price }) => (
          <tr className={classes.body}>
            <Box component={"img"} src={imageSrc} width='100px' />
            <td>{name}</td>
            <td>{quantity}</td>
            <td>{price}</td>
          </tr>
        ))}
      </Box>
    </Container>
  );
}

import React from "react";
import { Box } from "@material-ui/core";
import Navbar from "./Navbar";

export default function AppComponent({ children }) {
  return (
    <Box maxWidth='1120px' width='100%' m='0 auto' height='100vh'>
      <Box>
        <Navbar />
        {children}
      </Box>
    </Box>
  );
}

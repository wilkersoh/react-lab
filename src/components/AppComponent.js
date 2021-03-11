import React from "react";
import { Box } from "@material-ui/core";
import Navbar from "./Navbar";

export default function AppComponent({ children }) {
  return (
    <Box display='flex' flexDirection='column' minHeight='100vh'>
      <Navbar />
      {children}
      <Box component='footer' textAlign='center' py={4} mt={"auto"}>
        React Component created by yz
      </Box>
    </Box>
  );
}

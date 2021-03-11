import React from "react";

import { Box } from "@material-ui/core";

export default function Container({ children, ...props }) {
  return (
    <Box
      maxWidth='1120px'
      px={{ xs: 2, md: 4 }}
      width='100%'
      m='0 auto'
      style={{ border: "2px solid black" }}
      {...props}>
      {children}
    </Box>
  );
}

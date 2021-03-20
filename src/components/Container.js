import React from "react";

import { Box } from "@material-ui/core";

export default function Container({ children, ...props }) {
  return (
    <Box
      component={"main"}
      maxWidth='1120px'
      px={{ xs: 2, md: 4 }}
      width='100%'
      m='0 auto'
      {...props}>
      {children}
    </Box>
  );
}

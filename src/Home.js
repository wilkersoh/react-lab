import React from "react";
import { Link } from "react-router-dom";

import { Box, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const paths = {
  meterial_pagination: "/meterial-pagination",
  custom_pagination: "/custom-pagination",
};

export default function Home() {
  const classes = useListStyle();

  return (
    <Box>
      <List component='nav' aria-label='react list components'>
        <Box component='ul' className={classes.ul}>
          {Object.entries(paths).map(([name, path]) => (
            <Box component='li' className={classes.li}>
              <Link key={name} to={path}>
                {name.split("_").join(" ")}
              </Link>
            </Box>
          ))}
        </Box>
      </List>
    </Box>
  );
}

const useListStyle = makeStyles(() => ({
  ul: {
    listStyle: "none",
  },
  li: {
    textAlign: "center",
    border: "2px solid #bbbbbb",
    marginTop: "0.5rem",
    "& a": {
      display: "inline-block",
      width: "100%",
      padding: "0.5rem 2rem",
    },
  },
}));

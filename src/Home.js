import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Container from "./components/Container";
import { Box, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PATHS } from "./lib/routes";
import { searchContext } from "./components/AppComponent";

export default function Home() {
  const classes = useListStyle();
  const { components } = useContext(searchContext);

  return (
    <Container>
      <List component='nav' aria-label='react list components'>
        <Box component='ul' className={classes.ul}>
          {(components.length ? components : PATHS).map(({ name, path }) => (
            <Box component='li' key={name} className={classes.li}>
              <Link key={name} to={path}>
                {name}
              </Link>
            </Box>
          ))}
        </Box>
      </List>
    </Container>
  );
}

const useListStyle = makeStyles(() => ({
  ul: {
    listStyle: "none",
    padding: 0,
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

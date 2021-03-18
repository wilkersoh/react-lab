import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
  useHistory,
  useParams,
} from "react-router-dom";

import Box from "@material-ui/core/Box";
import Container from "./components/Container";

export default function NestedRoute() {
  // const {} = useParams();

  return (
    <Container>
      <Box>Routing</Box>
    </Container>
  );
}

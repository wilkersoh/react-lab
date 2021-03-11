import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";
import Container from "./Container";

export default function Navbar() {
  return (
    <Container
      display='flex'
      justifyContent='space-between'
      alignItems='center'>
      <h1>React Lab</h1>
      <Link to='/'>Home</Link>
    </Container>
  );
}

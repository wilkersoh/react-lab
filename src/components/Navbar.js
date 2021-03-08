import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";

export default function Navbar() {
  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <h1>React Lab</h1>
      <Link to='/'>Home</Link>
    </Box>
  );
}

import React, { createContext, useState } from "react";
import { Box } from "@material-ui/core";
import Navbar from "./Navbar";
import { PATHS } from "../lib/routes";

export const searchContext = createContext();

export default function AppComponent({ children }) {
  const [searchComponent, setSearchComponent] = useState([]);

  const onChangeSearch = (e) => {
    const value = e.target.value;
    const result = PATHS.filter(({ name }) => name.match(value));

    setSearchComponent(result);
  };

  return (
    <Box display='flex' flexDirection='column' minHeight='100vh'>
      <searchContext.Provider value={{ components: searchComponent }}>
        <Navbar onChange={onChangeSearch} />
        {children}
      </searchContext.Provider>
      <Box component='footer' textAlign='center' py={4} mt={"auto"}>
        React Component created by yz
      </Box>
    </Box>
  );
}

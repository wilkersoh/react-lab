import React, { useLayoutEffect, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";

import AppComponent from "./components/AppComponent";
import Home from "./Home";
import { PATHS } from "./lib/routes";

import "./styles/global.css";

function App() {
  return (
    <Router>
      <AppComponent>
        <Switch>
          <Routes />
        </Switch>
      </AppComponent>
    </Router>
  );
}

const Routes = () => {
  const location = useLocation();
  // Scroll to top if path changes
  /**
      1. useEffect: render components -> paint to screen -> scroll to top (run effect),(need to add css scroll-behavior: smooth; in html tag)
      2. useLayoutEffect: render components -> scroll to top (run effect) -> paint to screen
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Route exact path='/' component={Home} />
      {PATHS.map(({ path, component }) => (
        <Route key={path} path={path} component={component} />
      ))}
    </>
  );
};

export default App;

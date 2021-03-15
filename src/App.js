import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppComponent from "./components/AppComponent";
import Home from "./Home";
import { PATHS } from "./lib/routes";

import "./styles/global.css";

function App() {
  return (
    <Router>
      <AppComponent>
        <Switch>
          <Route exact path='/' component={Home} />
          {PATHS.map(({ path, component }) => (
            <Route key={path} path={path} component={component} />
          ))}
        </Switch>
      </AppComponent>
    </Router>
  );
}

export default App;

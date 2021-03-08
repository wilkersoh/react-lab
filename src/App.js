import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MeterialPagination from "./components/MeterialPagination";
import CustomPagination from "./components/CustomPagination";
import AppComponent from "./components/AppComponent";
import Home from "./Home";

function App() {
  return (
    <Router>
      <AppComponent>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/meterial-pagination' component={MeterialPagination} />
          <Route path='/custom-pagination' component={CustomPagination} />
        </Switch>
      </AppComponent>
    </Router>
  );
}

export default App;

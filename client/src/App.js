import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./pages/Search.js";
import Books from "./pages/Books.js";
import Saved from "./pages/Saved.js";
import NoMatch from "./pages/NoMatch.js";

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path="/books" component={Books} />
        <Route exact path="/saved" component={Saved} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;

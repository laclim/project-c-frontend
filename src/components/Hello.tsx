import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Login } from "./Login";
import NoMatch from "./NoMatch";
import Home from "./Home";
export interface HelloProps {
  compiler: string;
  framework: string;
}

export const Hello = (props: HelloProps) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
};

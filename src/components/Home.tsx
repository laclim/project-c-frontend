import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import StoreState from "../redux/storeState";
import { Task } from "./protected/Task";
const Home = () => {
  const authenticated = useSelector(
    (state: StoreState) => state.user.authenticated
  );
  return !authenticated ? (
    <Link to="/login">
      <strong>Login</strong>
    </Link>
  ) : (
    <Link to="/task">Tasks</Link>
  );
};

export default Home;

import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const Home = () => {
  return (
    <Link to="/login">
      <strong>Login</strong>
    </Link>
  );
};

export default Home;

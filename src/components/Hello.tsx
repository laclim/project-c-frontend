import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  RouteProps,
  useHistory
} from "react-router-dom";
import { Login } from "./Login";
import NoMatch from "./NoMatch";
import Home from "./Home";
import { useSelector, useDispatch } from "react-redux";
import StoreState from "../redux/storeState";
import { Welcome } from "./protected/welcome";
import { dispatchType } from "../redux";
import { Task } from "./protected/Task";
import { axiosInstance as axios } from "../axios/index";
import "../axios/index";
import { Register } from "./Register";
export interface HelloProps {
  compiler: string;
  framework: string;
}

// Add a request interceptor

export const Hello = (props: HelloProps) => {
  const dispatch = useDispatch<dispatchType>();
  if (localStorage.getItem("at") && localStorage.getItem("rt")) {
    dispatch({
      type: "SET_AUTHENTICATED",
      payload: { userId: "result.userId" }
    });
    axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "at"
    )}`;
  }

  return (
    <Router>
      <AuthButton />
      <Switch>
        <Route exact path="/" component={Home} />
        <UnauthenticatedRoute exact path="/login" component={Login} />
        <UnauthenticatedRoute exact path="/register" component={Register} />
        <PrivateRoute path="/welcome" component={Welcome} />
        <PrivateRoute path="/task" component={Task} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
};

function AuthButton() {
  const dispatch = useDispatch<dispatchType>();
  let history = useHistory();
  const authenticated = useSelector(
    (state: StoreState) => state.user.authenticated
  );
  return authenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          history.push("/");
          dispatch({ type: "LOGOUT" });
          localStorage.removeItem("at");
          localStorage.removeItem("rt");
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

const PrivateRoute = ({ component: Component, ...rest }: RouteProps) => {
  const authenticated = useSelector(
    (state: StoreState) => state.user.authenticated
  );

  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const UnauthenticatedRoute = ({
  component: Component,
  ...rest
}: RouteProps) => {
  const authenticated = useSelector(
    (state: StoreState) => state.user.authenticated
  );

  return (
    <Route
      {...rest}
      render={props =>
        !authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

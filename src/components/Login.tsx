import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { dispatchType } from "../redux";
import { useHistory, useLocation, Link } from "react-router-dom";

import { axiosInstance as axios } from "../axios/index";

export const Login = () => {
  const [state, setstate] = useState({ email: "", password: "" });
  const dispatch = useDispatch<dispatchType>();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", {
        email: state.email,
        password: state.password
      });
      if (response.status == 200) {
        localStorage.at = response.data.token;
        localStorage.rt = response.data.refreshToken;
        dispatch({
          type: "SET_AUTHENTICATED",
          payload: { userId: response.data.userId }
        });
        axios.defaults.headers[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        history.replace(from);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        email:
        <input
          type="text"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
      </label>
      <label>
        password:
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
      </label>
      <input type="submit" value="Login" onClick={handleLogin} />
      <Link to="/register">sign up</Link>
    </form>
  );
};

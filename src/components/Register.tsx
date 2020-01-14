import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { dispatchType } from "../redux";
import { useHistory, useLocation, Link } from "react-router-dom";

import { axiosInstance as axios } from "../axios/index";

export const Register = () => {
  const [state, setstate] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirmation: ""
  });
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

  const handleRegister = async () => {
    try {
      const response = await axios.post("/register", {
        email: state.email,
        name: state.name,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      });
      if (response.status == 200) {
        console.log("register completed");
        history.replace(from);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(state);
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
        name:
        <input
          type="text"
          name="name"
          value={state.name}
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
      <label>
        confirm password:
        <input
          type="password"
          name="passwordConfirmation"
          value={state.passwordConfirmation}
          onChange={handleChange}
        />
      </label>
      <input type="submit" value="Register" onClick={handleRegister} />
    </form>
  );
};

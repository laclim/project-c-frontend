import * as React from "react";
import { useState } from "react";

export const Login = () => {
  const [state, setstate] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "lim.ac96@gmail.com",
          password: "12345"
        })
      });
      console.log(await response.json());
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
    </form>
  );
};

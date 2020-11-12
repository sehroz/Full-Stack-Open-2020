import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const Login = ({ show, setToken, setPage }) => {
  const [username, setUser] = useState("sehroz");
  const [password, setPass] = useState("12345");

  const [login, loginData] = useMutation(LOGIN);

  useEffect(() => {
    if (loginData.data) {
      const token = loginData.data.login.value;
      setToken(token);
      setPage("books");
      localStorage.setItem("libToken", token);
    }
  }, [loginData.data, setToken, setPage]);

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    login({
      variables: { username, password },
    });

    setUser("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Enter Username
          <input
            value={username}
            onChange={({ target }) => setUser(target.value)}
          />
        </div>
        <div>
          Enter Password
          <input
            value={password}
            onChange={({ target }) => setPass(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

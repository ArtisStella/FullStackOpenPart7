import React, { useState } from "react";
import { SetNotification, useNotificationDispatch } from "./NotificationContext";
import { useLogin } from "./AuthenticationContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const notificationDispatch = useNotificationDispatch();
  const logIn = useLogin();

  const login = async (event) => {
    event.preventDefault();
    try {
      logIn({ username, password });
      setUsername("");
      setPassword("");
    } catch (exception) {
      SetNotification(notificationDispatch, { content: "Incorrect Username or Password", type: "Error" } , 3);
    }
  };

  return (
    <div className="col-md-4">
      <h3>Login</h3>
      <form onSubmit={login}>
        <div className="mb-2">
          <label className="form-label">Username</label>
          <input
            id="userInp"
            name="username"
            className="form-control form-control-sm"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Password</label>
          <input
            id="passInp"
            type="password"
            name="password"
            className="form-control form-control-sm"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className="btn btn-sm btn-primary loginBtn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

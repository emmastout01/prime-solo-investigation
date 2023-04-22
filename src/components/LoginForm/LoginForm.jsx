import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button, TextField, Typography } from "@mui/material";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <Typography variant="h4" sx={{marginBottom: "20px" }}>
        Login
      </Typography>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div className="form-inputs">
        <div>
          <TextField
            type="text"
            name="username"
            label="Username"
            variant="outlined"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <TextField
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <Button type="submit" variant="contained" name="submit">
            Log In
          </Button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;

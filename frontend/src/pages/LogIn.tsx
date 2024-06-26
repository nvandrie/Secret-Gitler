import { TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import text_logo from "/logos/text_logo.png";
import { login } from "../slices/authSlice";
import { useAppDispatch } from "../hooks/redux-hooks";
import {
  showNotification,
  NotificationType,
} from "../slices/notificationSlice";

/*
Handles login for when users already have an account.
*/
const LogIn = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    if (email && password) {
      dispatch(
        login({
          email,
          password,
        })
      );
    } else {
      dispatch(
        showNotification({
          message: "Please provide email and password",
          type: NotificationType.Error,
        })
      );
    }
  };

  return (
    <div className="GenericPage">
      <img src={text_logo} alt="Image" className="image" />
      <div className="ButtonContainer">
        <TextField
          className="TextField"
          sx={{ "& fieldset": { border: "none" } }}
          fullWidth
          required
          id="email"
          label="Email"
          name="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <TextField
          className="TextField"
          type="password"
          sx={{ "& fieldset": { border: "none" } }}
          required
          id="password"
          label="Password"
          name="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <br></br>
        <Link to="/createjoingamepage">
          <button
            className="Button"
            disabled={email === "" || password === ""}
            onClick={handleLogin}
          >
            Log In
          </button>
        </Link>
        <br></br>
        <Link to="/signup" style={{ color: "white", marginBottom: "5px" }}>
          Don't have an account? Sign up here.
        </Link>
        <Link to="/login" style={{ color: "white" }}>
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default LogIn;

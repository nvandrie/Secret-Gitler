import { TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import text_logo from "/text_logo.png";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};

  return (
    <>
      <img src={text_logo} alt="Image" className="image" />
      <div className="ButtonContainer">
        <TextField
          className="TextField"
          sx={{ "& fieldset": { border: "none" } }}
          fullWidth
          required
          id="username"
          label="Username"
          name="username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
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
            disabled={username === "" || password === ""}
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
    </>
  );
};

export default LogIn;

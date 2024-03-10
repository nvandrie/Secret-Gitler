import { TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import text_logo from "/text_logo.png";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {};

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
          type="email"
          sx={{ "& fieldset": { border: "none" } }}
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
        <TextField
          className="TextField"
          type="password"
          sx={{ "& fieldset": { border: "none" } }}
          required
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPasswore"
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />
        <br></br>
        <Link to="/createjoingamepage">
          <button
            className="Button"
            disabled={confirmPassword !== password || password === ""}
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </Link>
        <br></br>
        <Link to="/login" style={{ color: "white", marginBottom: "5px" }}>
          Already have an account? Log in here.
        </Link>
      </div>
    </>
  );
};

export default SignUp;

import { Container, Box, TextField, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Link } from "react-router-dom";
import text_logo from "/text_logo.png";
import { login } from "../slices/authSlice";
import { useAppDispatch } from "../hooks/redux-hooks";
import {
  showNotification,
  NotificationType,
} from "./../slices/notificationSlice";

const Login = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    // This is only a basic validation of inputs. Improve this as needed.
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

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#A0AAB4", //someone play around with these values
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#B2BAC2", //someone play around with these values
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#E0E3E7", //someone play around with these values
      },
      "&:hover fieldset": {
        borderColor: "#B2BAC2", //someone play around with these values
      },
      "&.Mui-focused fieldset": {
        borderColor: "#6F7E8C", //someone play around with these values
      },
    },
  });

  return (
    <>
      <img src={text_logo} alt="Image" className="image" />
      <Container maxWidth="xs">
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ mt: 1 }}>
            <CssTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className = "loginText" />

            <CssTextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoFocus
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
              className="loginText"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "white", color: "black" }}
              onClick={handleLogin}
            >
              <b>Login</b>
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">Don't have an account? Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;



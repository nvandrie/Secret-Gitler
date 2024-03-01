import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};

  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#A0AAB4', //someone play around with these values
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#B2BAC2', //someone play around with these values
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#E0E3E7', //someone play around with these values
      },
      '&:hover fieldset': {
        borderColor: '#B2BAC2', //someone play around with these values
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6F7E8C', //someone play around with these values
      },
    },
  });

  return (
    <>
      <Container maxWidth="xs">
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Typography variant="h5">Login</Typography> */}
          <Box sx={{ mt: 1 }}>
          <CssTextField margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className = "loginText" />

            <CssTextField margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className = "loginText" />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "white", color: "black"}}
              onClick={handleLogin}
              component={Link}
              to="/lobby"
            >
              <b>Login</b>
            </Button>
            <Grid container justifyContent={"flex-end"}>
              {/* <Grid item>
                <Link to="/register">Don't have an account? Register</Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;

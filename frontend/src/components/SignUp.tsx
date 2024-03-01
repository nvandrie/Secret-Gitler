import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { alpha, styled } from '@mui/material/styles';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {};

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
          {/* <Typography variant="h5">Register</Typography> */}
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CssTextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className ="loginText"
                />
              </Grid>

              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className ="loginText"
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className ="loginText"
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "white", color: "black" }}
              onClick={handleRegister}
              component={Link}
              to="/lobby"
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              {/* <Grid item>
                <Link to="/login">Already have an account? Login</Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
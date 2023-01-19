import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Button, TextField } from "@mui/material";
import { setPassword, setUsername } from "../../../Redux/slices/userSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Header from "../LandingPage/Header";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = ({ onSignIn }: any) => {
  const userState = useAppSelector((state) => state.userState.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loggingIn, setLoggingIn] = useState(false);
  const tenantNameState = useAppSelector(
    (state) => state.tenantNameState.value
  );
  const themeState = useAppSelector((state) => state.themeState.value);
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState<any>(``);

  const signIn = async () => {
    try {
      setLoggingIn(true);
      const user = await Auth.signIn(userState.username, userState.password);
      localStorage.setItem("loggedInUsername", userState.username);
      sessionStorage.setItem("loggedInUsername", userState.username);
      navigate("/");
      onSignIn();
    } catch (error: any) {
      setLoggingIn(false);
      console.log(`error signing in: `, error);
      setSnackbarErrorMessage(error.message);
      handleClick();
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div id="loginPageRoot">
      <Header themeState={themeState} tenantName={tenantNameState.name} />
      <div className="loginPageContainer">
        <div className="loginBox">
          <TextField
            id="username"
            label="Username"
            value={userState.username}
            onChange={(e) => dispatch(setUsername(e.target.value))}
          />

          <TextField
            id="password"
            label="Password"
            type="password"
            value={userState.password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
          <Button id="signinButton" color="primary" onClick={signIn}>
            Sign in
          </Button>
          <Link to="/Signup">
            <Button id="signupButton" color="primary">
              Create an account
            </Button>
          </Link>
          <Link to="/">
            <Button id="homePageButton" color="primary">
              Go to home page
            </Button>
          </Link>
          {loggingIn ? (
            <div className="progress absolute top-1/2 left-1/2 z-20">
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            </div>
          ) : null}
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {snackbarErrorMessage}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default Login;

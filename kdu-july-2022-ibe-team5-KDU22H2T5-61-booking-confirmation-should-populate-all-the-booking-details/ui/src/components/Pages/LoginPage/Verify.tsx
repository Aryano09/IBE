import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Button, TextField } from "@mui/material";
import {
  setEmail,
  setPassword,
  setUsername,
} from "../../../Redux/slices/userSlice";
import Header from "../LandingPage/Header";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { setErrorMessage } from "../../../Redux/slices/errorMessageSlice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Verify = ({ onSignIn }: any) => {
  const userState = useAppSelector((state) => state.userState.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signUpCode, setSignUpCode] = useState(``);
  const tenantNameState = useAppSelector(
    (state) => state.tenantNameState.value
  );
  const themeState = useAppSelector((state) => state.themeState.value);
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState<any>(``);

  async function confirmSignUp() {
    const username = userState.username;

    try {
      await Auth.confirmSignUp(username, signUpCode);
      dispatch(setErrorMessage("Your account has been created sucessfully verified"));
      navigate("/Error");
    } catch (error: any) {
      console.log("error confirming sign up", error);
      setSnackbarErrorMessage(error.message);
      setOpen(true);
    }
  }
  async function resendConfirmationCode() {
    const username = userState.username;
    try {
      await Auth.resendSignUp(username);
      console.log("code resent successfully");
    } catch (error: any) {
      console.log("error resending code: ", error);
      setSnackbarErrorMessage(error.message);
      setOpen(true);
    }
  }

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
          <Button
            id="resendCode"
            color="primary"
            onClick={resendConfirmationCode}
          >
            Send code
          </Button>
          <TextField
            id="code"
            label="Code"
            onChange={(e) => setSignUpCode(e.target.value)}
          />
          <Button id="confirmSignUp" color="primary" onClick={confirmSignUp}>
            Verify account
          </Button>
          <Link to="/Login">
            <Button id="signinButton" color="primary">
              Go to login page
            </Button>
          </Link>

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

export default Verify;

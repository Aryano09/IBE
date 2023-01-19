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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Signup = ({ onSignIn }: any) => {
  const userState = useAppSelector((state) => state.userState.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [signUpCode, setSignUpCode] = useState(``);
  const tenantNameState = useAppSelector(
    (state) => state.tenantNameState.value
  );
  const themeState = useAppSelector((state) => state.themeState.value);
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState<any>(``);
  const [snackbarInfoMessage, setSnackbarInfoMessage] = useState<any>(``);

  const signUp = async () => {
    const username = userState.username;
    const password = userState.password;
    // const email = userState.email;
    try {
      const { user, userConfirmed, userSub } = await Auth.signUp({
        username,
        password,
        // attributes: {
        //   email,
        // },
        autoSignIn: {
          enabled: false,
        },
      });
      console.log(`user: `, user);
      console.log(`userConfirmed: `, userConfirmed);
      console.log(`userSub: `, userSub);
      console.log(`signUpCode: `, signUpCode);
      setSnackbarInfoMessage(`Please enter your email and verify`);
      handleClickInfo();
      navigate("/Verify");
      // setSignUpSuccess(true);
    } catch (error: any) {
      console.log("error signing up:", error);
      setSnackbarErrorMessage(error.message);
      setSignUpSuccess(false);
      handleClick();
    }
  };

  async function confirmSignUp() {
    const username = userState.username;

    try {
      await Auth.confirmSignUp(username, signUpCode);
      setSignUpSuccess(false);
      navigate("/");
    } catch (error) {
      console.log("error confirming sign up", error);
      setSignUpSuccess(false);
    }
  }
  async function resendConfirmationCode() {
    const username = userState.username;
    try {
      await Auth.resendSignUp(username);
      console.log("code resent successfully");
    } catch (err) {
      console.log("error resending code: ", err);
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

  const [openInfo, setOpenInfo] = React.useState(false);

  const handleClickInfo = () => {
    setOpen(true);
  };

  const handleCloseInfo = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenInfo(false);
  };

  return (
    <div id="loginPageRoot">
      <Header themeState={themeState} tenantName={tenantNameState.name} />
      <div className="loginPageContainer">
        <div className="loginBox">
          {!signUpSuccess ? (
            <>
              <TextField
                id="username"
                label="Email"
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

              {/* <TextField
                id="email"
                label="Email"
                type="email"
                value={userState.email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
              /> */}
              <Button id="signupButton" color="primary" onClick={signUp}>
                Create account
              </Button>
            </>
          ) : (
            <>
              <div className="codeDescription">
                Please enter the code sent to {userState.username}
              </div>
              <TextField
                id="code"
                type="text"
                defaultValue={signUpCode}
                // value="type code"
                onChange={(e) => {
                  setSignUpCode(e.target.value);
                  console.log(`signUpCode: `, signUpCode);
                }}
              />
              <Button
                id="resendCode"
                color="primary"
                onClick={resendConfirmationCode}
              >
                Resend code
              </Button>
              <Button
                id="confirmSignUp"
                color="primary"
                onClick={confirmSignUp}
              >
                Confirm sign up
              </Button>
            </>
          )}

          <Link to="/Login">
            <Button id="signinButton" color="primary">
              Go to login page
            </Button>
          </Link>

          <Link to="/Verify">
            <Button id="verifyButton" color="primary">
              Verify account
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

          <Snackbar
            open={openInfo}
            autoHideDuration={3000}
            onClose={handleCloseInfo}
          >
            <Alert
              onClose={handleCloseInfo}
              severity="info"
              sx={{ width: "100%" }}
            >
              {snackbarInfoMessage}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default Signup;

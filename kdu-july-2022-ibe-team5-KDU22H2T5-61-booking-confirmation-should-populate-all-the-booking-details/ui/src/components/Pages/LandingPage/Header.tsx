import React, { useEffect } from "react";
import Brand from "./Brand";
import Currency from "./Currency";
import Language from "./Language";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../../aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { setIsLoggedIn } from "../../../Redux/slices/userSlice";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

Amplify.configure(awsconfig);

const Header = ({
  themeState,
  tenantName,
}: any) => {
  const userState = useAppSelector((state) => state.userState.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const assessLoggedInState = () => {
    Auth.currentAuthenticatedUser()
      .then((sess) => {
        console.log(`logged in`);
        dispatch(setIsLoggedIn(true));
      })
      .catch(() => {
        console.log(`not logged in`);
        dispatch(setIsLoggedIn(false));
      });
  };

  useEffect(() => {
    assessLoggedInState();
  }, []);

  const signOut = async () => {
    try {
      await Auth.signOut();
      dispatch(setIsLoggedIn(false));
      console.log(`logged out`);
      navigate("/");
      localStorage.removeItem("loggedInUsername");
      sessionStorage.removeItem("loggedInUsername");
    } catch (error) {
      console.log(`error signing out: `, error);
    }
  };

  return (
    <nav>
      <ul
        id="header"
        className="grid grid-rows-1 grid-cols-3"
        style={{
          gridTemplateColumns:
            sessionStorage.getItem("loggedInUsername") == null && userState.username == null
              ? "50% auto fit-content(100%) fit-content(100%)"
              : "50% auto fit-content(100%) fit-content(100%) fit-content(100%)",
        }}
      >
        <Link to="/">
          <Brand themeState={themeState} tenantName={tenantName} />
        </Link>
        <Language themeState={themeState} />
        <Currency themeState={themeState} />
        {sessionStorage.getItem("loggedInUsername") != null ? (
          <>
            <Link to="/MyBookings">
              <Button variant="contained" color="success">
                My bookings
              </Button>
            </Link>
            <a>
              <Button
                onClick={signOut}
                variant="contained"
                color="error"
                className="inline-block"
              >
                Logout
              </Button>
            </a>
          </>
        ) : (
          <Link to="/Login">
            <Button variant="contained" color="success">
              Login
            </Button>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Header;

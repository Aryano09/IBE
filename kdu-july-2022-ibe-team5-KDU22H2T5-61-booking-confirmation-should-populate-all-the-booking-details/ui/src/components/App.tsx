import "../styles/App.css";
import Landing from "./Pages/LandingPage/Landing";
import Room from "./Pages/RoomPage/Room";
import Checkout from "./Pages/CheckoutPage/Checkout";
import Booking from "./Pages/BookingPage/Booking";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Confirmation from "./Pages/ConfirmationPage/Confirmation";
import Login from "./Pages/LoginPage/Login";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { setIsLoggedIn } from "../Redux/slices/userSlice";
import { Auth } from "aws-amplify";
import Signup from "./Pages/LoginPage/Signup";
import Verify from "./Pages/LoginPage/Verify";
import MyBookings from "./Pages/MyBookingsPage/MyBookings";
import Error from "./Pages/ErrorPage/Error";

function App() {
  const userState = useAppSelector((state) => state.userState.value);
  const dispatch = useAppDispatch();
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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Rooms" element={<Room />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/Booking/Confirmation" element={<Confirmation />} />
        <Route
          path="/Login"
          element={<Login onSignIn={assessLoggedInState} />}
        />
        <Route
          path="/Signup"
          element={<Signup onSignIn={assessLoggedInState} />}
        />
        <Route
          path="/Verify"
          element={<Verify onSignIn={assessLoggedInState} />}
        />
        <Route path="/MyBookings" element={<MyBookings />} />
        {/* <Route path="/Confirmation" element={<Confirmation />} /> */}
        <Route path="/Error" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;

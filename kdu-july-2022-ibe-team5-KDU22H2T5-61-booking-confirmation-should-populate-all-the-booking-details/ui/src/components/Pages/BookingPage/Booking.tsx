import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { useEffect, useState } from "react";
import languageIcon from "../../../assets/language.svg";
import currencyIcon from "../../../assets/currency.svg";
import "./css/Booking.css";
import "./Itenarystyles/TripItenary.css";
import Header from "../LandingPage/Header";
import { fetchTenantName } from "../../../Redux/slices/tenantNameSlice";
import { fetchTenantConfiguration } from "../../../Redux/slices/tenantConfigurationSlice";
import { fetchTheme } from "../../../Redux/slices/themeSlice";
import CheckoutLabel from "./CheckoutLabel";
import InfoForm from "./InfoForm";
import Timer from "./Timer";
import StatusBar from "../RoomPage/StatusBar";

function Booking() {
  const dispatch = useAppDispatch();

  const tenantNameState = useAppSelector(
    (state) => state.tenantNameState.value
  );
  const themeState = useAppSelector((state) => state.themeState.value);

  useEffect(() => {
    dispatch(fetchTenantName());
    dispatch(fetchTheme());
    dispatch(fetchTenantConfiguration());
  }, []);

  const data: any = localStorage.getItem("checkOutTime");
  // console.log(JSON.parse(data));
  // console.log(data != null);
  const timer = JSON.parse(data);
  const time = new Date(timer);
  console.log(time);
  time.setSeconds(time.getSeconds() + 600);

  const [activeStep, setActiveStep] = useState(1);
  return (
    <div id="bookingPageRoot" className="Booking">
      <Header
        themeState={themeState}
        tenantName={tenantNameState.name}
        languageIcon={languageIcon}
        currencyIcon={currencyIcon}
      />

      <StatusBar activeStep={activeStep} setActiveStep={setActiveStep}/>

      <CheckoutLabel />

      <InfoForm />

      <Timer expiryTimestamp={time} />
    </div>
  );
}

export default Booking;

import React from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import Header from "../LandingPage/Header";
import languageIcon from "../../../assets/language.svg";
import currencyIcon from "../../../assets/currency.svg";

const Error = () => {
  const dispatch = useAppDispatch();
  const tenantNameState = useAppSelector(
    (state) => state.tenantNameState.value
  );
  const errorMessageState = useAppSelector((state) => state.errorMessageState.value);
  const themeState = useAppSelector((state) => state.themeState.value);
  return (
    <div id="errorPageRoot">
      <Header
        themeState={themeState}
        tenantName={tenantNameState.name}
        languageIcon={languageIcon}
        currencyIcon={currencyIcon}
      ></Header>
      <div className="errorContainer">
        {errorMessageState.message}
      </div>
    </div>
  );
};

export default Error;

import React, { useState } from "react";
import { useEffect } from "react";
import MainForm from "./MainForm";

const Main = ({
  themeState,
  propertyOptions,
  dateCalenderState,
  accessibleIcon,
  tenantConfigurationState,
  searchParam,
  dateCalenderRatesState,
}: any) => {
  return (
    <main
      className="grid grid-rows-1 grid-cols-1"
      // style={{backgroundImage: themeState.background}}
    >
      <div className="mainSearch grid grid-cols-1 bg-white">
        <MainForm propertyOptions={propertyOptions} selectDatesElement={dateCalenderState} accessibleIcon={accessibleIcon} tenantConfigurationState={tenantConfigurationState} searchParam={searchParam} dateCalenderRatesState={dateCalenderRatesState}/>
      </div>
    </main>
  );
};

export default Main;

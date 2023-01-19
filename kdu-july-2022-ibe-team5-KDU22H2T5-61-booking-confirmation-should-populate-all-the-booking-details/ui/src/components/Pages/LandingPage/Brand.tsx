import React from "react";
import { useAppSelector } from "../../../Redux/hooks";

const Brand = ({ tenantName, themeState }: any) => {
  const textsState = useAppSelector((state) => state.textsState.value);
  return (
    <li className="tenant cursor-pointer justify-self-start grid grid-cols-2 grid-rows-1">
      <div className="tenantName">{tenantName}</div>
      <div className="headerName">{textsState.brandName}</div>
    </li>
  );
};

export default Brand;

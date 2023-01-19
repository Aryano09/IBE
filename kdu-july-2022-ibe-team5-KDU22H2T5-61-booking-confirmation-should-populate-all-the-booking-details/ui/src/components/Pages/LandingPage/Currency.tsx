import React from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRef } from "react";

const Currency = ({ themeState }: any) => {
  const dispatch = useAppDispatch();
  //const currencyState = useAppSelector((state) => state.currencyState.value);
  const currencyElement = useRef(null);
  const currencyOptions = [
    { code: "USD", name: "US Dollars" },
    { code: "INR", name: "Indian Rupee" },
  ];

  const currencyChangeHandler = (e: any) => {
    
  };
  return (
    <li className="currencyNav cursor-pointer justify-self-end grid grid-rows-1">
      {/* <div className="currencyIcon">
        <img src={currencyIcon} alt="" />
      </div> */}
      {/* <div className="currencyLabel">USD</div> */}
      {/* <select
        name=""
        id=""
        className="currencyLabel"
        onChange={(e) => {
          currencyChangeHandler(e);
        }}
      >
        {currencyOptions.map((currency: any) => (
          <option key={currency.code} value={currency.code}>
            {currency.name}
          </option>
        ))}
      </select> */}

      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Currency</InputLabel>
        <Select
          ref={currencyElement}
          labelId="demo-select-small"
          id="demo-select-small"
          // value={languageOptions[0].code}
          label="Language"
          onChange={currencyChangeHandler}
        >
          {currencyOptions.map((currency: any) => (
            <MenuItem key={currency.code} value={currency.code}>
              {currency.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </li>
  );
};

export default Currency;

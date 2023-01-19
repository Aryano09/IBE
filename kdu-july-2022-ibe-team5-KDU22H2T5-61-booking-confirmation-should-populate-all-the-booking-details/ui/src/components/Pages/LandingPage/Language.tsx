import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import {
  setAccessibleLabel,
  setAdultsLabel,
  setAdultsLabelDescription,
  setBrandName,
  setDatePickerLabel,
  setGuestsLabel,
  setKidsLabel,
  setKidsLabelDescription,
  setPromoCodeLabel,
  setPropertyLabel,
  setPropertySearchLabel,
  setRoomsLabel,
  setTeensLabel,
  setTeensLabelDescription,
} from "../../../Redux/slices/textsSlice";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Language = ({ themeState }: any) => {
  const languageElement: any = useRef(null);
  const textElement: any = useRef("");
  const dispatch = useAppDispatch();
  const textsState = useAppSelector((state) => state.textsState.value);
  const languageOptions = [
    { code: "en", name: "English" },
    { code: "ar", name: "Arabic" },
    { code: "az", name: "Azerbaijani" },
    { code: "zh", name: "Chinese" },
    { code: "cs", name: "Czech" },
    { code: "da", name: "Danish" },
    { code: "nl", name: "Dutch" },
    { code: "eo", name: "Esperanto" },
    { code: "fi", name: "Finnish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "el", name: "Greek" },
    { code: "he", name: "Hebrew" },
    { code: "hi", name: "Hindi" },
    { code: "hu", name: "Hungarian" },
    { code: "id", name: "Indonesian" },
    { code: "ga", name: "Irish" },
    { code: "it", name: "Italian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "fa", name: "Persian" },
    { code: "pl", name: "Polish" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "sk", name: "Slovak" },
    { code: "es", name: "Spanish" },
    { code: "sv", name: "Swedish" },
    { code: "tr", name: "Turkish" },
    { code: "uk", name: "Ukranian" },
  ];

  interface textsStateListInterface {
    textLabel: string;
    textLabelSetter: ActionCreatorWithPayload<any, string>;
  }

  const textsStateList: textsStateListInterface[] = [
    { textLabel: textsState.originalBrandName, textLabelSetter: setBrandName },
    {
      textLabel: textsState.originalPropertyLabel,
      textLabelSetter: setPropertyLabel,
    },
    // {
    //   textLabel: textsState.originalPropertySearchLabel,
    //   textLabelSetter: setPropertySearchLabel,
    // },
    {
      textLabel: textsState.originalDatePickerLabel,
      textLabelSetter: setDatePickerLabel,
    },
    {
      textLabel: textsState.originalGuestsLabel,
      textLabelSetter: setGuestsLabel,
    },
    {
      textLabel: textsState.originalRoomsLabel,
      textLabelSetter: setRoomsLabel,
    },
    {
      textLabel: textsState.originalAccessibleLabel,
      textLabelSetter: setAccessibleLabel,
    },
    {
      textLabel: textsState.originalPromoCodeLabel,
      textLabelSetter: setPromoCodeLabel,
    },
    {
      textLabel: textsState.originalAdultsLabel,
      textLabelSetter: setAdultsLabel,
    },
    {
      textLabel: textsState.originalTeensLabel,
      textLabelSetter: setTeensLabel,
    },
    {
      textLabel: textsState.originalKidsLabel,
      textLabelSetter: setKidsLabel,
    },
    {
      textLabel: textsState.originalAdultsLabelDescription,
      textLabelSetter: setAdultsLabelDescription,
    },
    {
      textLabel: textsState.originalTeensLabelDescription,
      textLabelSetter: setTeensLabelDescription,
    },
    {
      textLabel: textsState.originalKidsLabelDescription,
      textLabelSetter: setKidsLabelDescription,
    },
  ];

  const languageChangeHandler = (e: any) => {
    const url =
      "https://script.google.com/macros/s/AKfycbwcvAOUKqcUissHCqd4TMQSg6_XPD4POi4SolvHFrlCsr-ADsXDU-RTJEj3TAWJwmCf4g/exec";
    const params = new URLSearchParams();
    params.append("source_lang", "auto");
    params.append("target_lang", e.target.value);
    languageElement.current.setAttribute("value", e.target.value);

    for (let i = 0; i < textsStateList.length; i++) {
      params.set("text", textsStateList[i].textLabel);
      axios
        .post(url, params)
        .then((res) => {
          dispatch(textsStateList[i].textLabelSetter(res.data.translatedText));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <li className="languageNav cursor-pointer justify-self-end grid grid-rows-1">
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Language</InputLabel>
        <Select
          ref={languageElement}
          labelId="demo-select-small"
          id="demo-select-small"
          // value={languageOptions[0].code}
          label="Language"
          onChange={languageChangeHandler}
        >
          {languageOptions.map((language: any) => (
            <MenuItem key={language.code} value={language.code}>
              {language.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </li>
  );
};

export default Language;

import React from "react";
import { useAppSelector } from "../../../../Redux/hooks";

const DatePickerLabel = () => {
  const textsState = useAppSelector((state) => state.textsState.value);
  return (
    <label id="selectDatesLabel" htmlFor="checkInCheckOutInput">
      {textsState.datePickerLabel}
    </label>
  );
};

export default DatePickerLabel;

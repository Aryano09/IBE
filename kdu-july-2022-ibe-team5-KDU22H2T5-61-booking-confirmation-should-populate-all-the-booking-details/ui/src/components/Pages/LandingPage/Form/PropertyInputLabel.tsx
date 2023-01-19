import React from "react";
import { useAppSelector } from "../../../../Redux/hooks";

const PropertyInputLabel = () => {
  const textsState = useAppSelector((state) => state.textsState.value);
  return (
    <label id="propertyInputLabel" htmlFor="propertyInput">
      {textsState.propertyLabel}
    </label>
  );
};

export default PropertyInputLabel;

import React from "react";
import { useAppSelector } from "../../../../Redux/hooks";

const PromoCodeLabel = () => {
  const textsState = useAppSelector((state) => state.textsState.value);
  return (
    <label id="promoCodeLabel" htmlFor="promoInput">
      {textsState.promoCodeLabel}
    </label>
  );
};

export default PromoCodeLabel;

import React from "react";
import { useAppSelector } from "../../../../Redux/hooks";

const AccessibleInput = ({ accessibleIcon }: any) => {
  const textsState = useAppSelector((state) => state.textsState.value);
  return (
    <div className="accessibleInputGrid grid">
      <input id="accessibleInput" type="checkbox" name="accessibleInput" />
      <img id="accessibleIcon" src={accessibleIcon} alt="" />
      <label id="accessibleInputLabel" htmlFor="accessibleInput">
        {textsState.accessibleLabel}
      </label>
    </div>
  );
};

export default AccessibleInput;

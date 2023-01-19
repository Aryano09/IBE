import React from "react";
import { useAppSelector } from "../../../../Redux/hooks";

const RoomGuestsLabel = ({tenantConfigurationState}:any) => {
  const textsState = useAppSelector((state) => state.textsState.value);
  return (
    <div className="roomGuestsLabels grid">
      {!!tenantConfigurationState.showGuests && (
        <label id="guestsInputLabel" htmlFor="guestsInput">
          {textsState.guestsLabel}
        </label>
      )}
      <label id="roomsInputLabel" htmlFor="roomsInput">
        {textsState.roomsLabel}
      </label>
    </div>
  );
};

export default RoomGuestsLabel;

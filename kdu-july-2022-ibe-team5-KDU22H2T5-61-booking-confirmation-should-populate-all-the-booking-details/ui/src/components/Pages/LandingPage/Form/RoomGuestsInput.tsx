import React, { useEffect, useRef, useState } from "react";
import GuestOption from "./GuestOption";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import { changeSelectedRoomCount } from "../../../../Redux/slices/selectedRoomCountSlice";

const RoomGuestsInput = ({ tenantConfigurationState }: any) => {
  const dispatch = useAppDispatch();
  const textsState = useAppSelector((state) => state.textsState.value);
  const guestCountState = useAppSelector(
    (state) => state.guestCountState.value
  );
  const refOne = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const toggle: any = () => setOpen(!open);
  const hideOnClickOut = (e: { target: any }) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", hideOnClickOut, true);
  }, []);

  return (
    <div className="roomGuestsInput grid grid-rows-1">
      {!!tenantConfigurationState.showGuests && (
        <div className="dropdown active" data-dropdown ref={refOne}>
          <button
            id="guestsInputLanding"
            type="button"
            name="guestsInput"
            placeholder="Guests"
            className="grid dropdown"
            data-dropdown-button
            onClick={() => {
              toggle(!open);
            }}
          >
            {/* <span>{`Adult(s) ${guestCountState.adultsCount}, Teen(s) ${guestCountState.teensCount}, Kid(s) ${guestCountState.kidsCount}`}</span> */}
            <span>{`Guest(s) ${
              guestCountState.adultsCount +
              guestCountState.teensCount +
              guestCountState.kidsCount
            }`}</span>
            <span className="dd-arrow material-symbols-outlined arrow">
              keyboard_arrow_down
            </span>
          </button>
          {!!open && (
            <div className="dropdownMenu grid">
              {!!tenantConfigurationState.showAdults && (
                <GuestOption
                  optionName={textsState.adultsLabel}
                  englishOptionName={textsState.originalAdultsLabel}
                />
              )}
              {!!tenantConfigurationState.showTeens && (
                <GuestOption
                  optionName={textsState.teensLabel}
                  englishOptionName={textsState.originalTeensLabel}
                />
              )}
              {!!tenantConfigurationState.showKids && (
                <GuestOption
                  optionName={textsState.kidsLabel}
                  englishOptionName={textsState.originalKidsLabel}
                />
              )}
            </div>
          )}
        </div>
      )}
      <select
        id="roomsInput"
        name="roomsInput"
        placeholder="1"
        className="grid"
        onChange={(e) =>
          dispatch(changeSelectedRoomCount(e.target.selectedIndex + 1))
        }
      >
        {Array.from(Array(tenantConfigurationState.roomLimit), (e, i) => {
          return <option value={`${i + 1}`}>{`${i + 1}`}</option>;
        })}
      </select>
    </div>
  );
};

export default RoomGuestsInput;

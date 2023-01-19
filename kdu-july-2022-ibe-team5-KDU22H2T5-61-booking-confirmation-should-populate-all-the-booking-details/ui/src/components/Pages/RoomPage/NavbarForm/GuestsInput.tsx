import React, { useEffect, useRef, useState } from "react";
import GuestOption from "../../LandingPage/Form/GuestOption";
import { useAppSelector } from "../../../../Redux/hooks";

const GuestInput = ({ guestCountState, tenantConfigurationState }: any) => {
  // console.log('tenantconf2 ', tenantConfigurationState)

  const textsState = useAppSelector((state) => state.textsState.value);
  const totalGuests = () => {
    let adultsCount =
      localStorage.getItem("adultsCount") == null
        ? guestCountState.adultsCount
        : Number(localStorage.getItem("adultsCount"));
    let teensCount =
      localStorage.getItem("teensCount") == null
        ? guestCountState.teensCount
        : Number(localStorage.getItem("teensCount"));
    let kidsCount =
      localStorage.getItem("kidsCount") == null
        ? guestCountState.kidsCount
        : Number(localStorage.getItem("kidsCount"));
    return adultsCount + teensCount + kidsCount;
  };

  const refOne = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const toggle: any = () => {
    setOpen(!open);
    if (refOne.current) refOne.current.classList.add("active");
  };
  const hideOnClickOut = (e: { target: any }) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
      refOne.current.classList.remove("active");
    }
  };

  useEffect(() => {
    document.addEventListener("click", hideOnClickOut, true);
  }, []);

  return (
    <div
      id="guestsDropdownMenu"
      className="dropdown active"
      data-dropdown
      ref={refOne}
    >
      <button
        id="guestsInput"
        type="button"
        name="guestsInput"
        placeholder="Guests"
        className="grid grid-cols-2"
        data-dropdown-button
        onClick={() => {
          // let ele: any = document.getElementById("guestsDropdownMenu");
          // ele.classList.toggle("active");
          // console.log("clicked, ", ele.classList);
          toggle(!open);
        }}
      >
        <div>
          <div className="dd-header-title">
            <span>Guests</span>
          </div>
          <div className="dd-header-title-value">{totalGuests()}</div>
        </div>
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
  );
};

export default GuestInput;

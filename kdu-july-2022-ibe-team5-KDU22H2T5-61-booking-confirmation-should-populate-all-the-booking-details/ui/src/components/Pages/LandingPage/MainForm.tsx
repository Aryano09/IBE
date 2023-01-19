import React from "react";
import AccessibleInput from "./Form/AccessibleInput";
import DatePicker from "./Form/DatePicker";
import DatePickerLabel from "./Form/DatePickerLabel";
import PromoCodeInput from "./Form/PromoCodeInput";
import PromoCodeLabel from "./Form/PromoCodeLabel";
import PropertyInput from "./Form/PropertyInput";
import PropertyInputLabel from "./Form/PropertyInputLabel";
import RoomGuestsInput from "./Form/RoomGuestsInput";
import RoomGuestsLabel from "./Form/RoomGuestsLabel";
import SearchInput from "./Form/SearchInput";

const MainForm = ({
  propertyOptions,
  selectDatesElement,
  accessibleIcon,
  tenantConfigurationState,
  searchParam,
  dateCalenderRatesState,
}: any) => {
  if (!tenantConfigurationState.showGuests) {
    document.documentElement.style.setProperty("--showGuests", "hidden");
  }
  if (!tenantConfigurationState.showAccessibleRoom) {
    document.documentElement.style.setProperty("--showAccessible", "hidden");
  }
  if (!tenantConfigurationState.showPromoCode) {
    document.documentElement.style.setProperty("--showPromoCode", "none");
  }

  return (
    <form action="" method="post" className="mainSearchForm grid grid-cols-1">
      <PropertyInputLabel />
      <PropertyInput propertyOptions={propertyOptions} />

      <DatePickerLabel />
      <DatePicker selectDatesElement={selectDatesElement} dateCalenderRatesState={dateCalenderRatesState}/>

      <RoomGuestsLabel tenantConfigurationState={tenantConfigurationState} />
      <RoomGuestsInput tenantConfigurationState={tenantConfigurationState} />

      <AccessibleInput accessibleIcon={accessibleIcon} />

      <PromoCodeLabel />
      <PromoCodeInput />

      <SearchInput searchParam = {searchParam}/>
    </form>
  );
};

export default MainForm;

import React from 'react'
import './css/Room.css'
import BedInput from './NavbarForm/BedInput'
import GuestsInput from './NavbarForm/GuestsInput'
import RoomsInput from './NavbarForm/RoomsInput'
import SearchDatesInput from './NavbarForm/SearchDatesInput'
import DateChecks from './NavbarForm/DateInput'

const NavForm = ({
  tenantConfigurationState,
  bedCountState,
  guestCountState,
  roomCountState,
  selectedDatesState,
  dateCalenderRatesState,
}: any) => {
  if (!tenantConfigurationState.showGuests) {
    document.documentElement.style.setProperty("--showGuests", "hidden");
  }

  // console.log('tenantconf ', tenantConfigurationState);
  return (
    <form method="post" className="NavSearchForm grid">
      <GuestsInput guestCountState={guestCountState} tenantConfigurationState={tenantConfigurationState}/>
      <RoomsInput tenantConfigurationState={tenantConfigurationState} roomCountState={roomCountState}/>
      <BedInput bedCountState={bedCountState}/>
      <DateChecks selectedDatesState={selectedDatesState} dateCalenderRatesState={dateCalenderRatesState}/>
      <SearchDatesInput />
    </form>
  )
}

export default NavForm
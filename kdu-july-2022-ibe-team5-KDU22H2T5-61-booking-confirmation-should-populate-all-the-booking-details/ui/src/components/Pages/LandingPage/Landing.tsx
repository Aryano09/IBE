import { useEffect, useRef, useState } from "react";
import axios from "axios";
import languageIcon from "../../../assets/language.svg";
import currencyIcon from "../../../assets/currency.svg";
import accessibleIcon from "../../../assets/accessible.svg";
import { useAppSelector, useAppDispatch } from "../../../Redux/hooks";
import { fetchTheme } from "../../../Redux/slices/themeSlice";
import Header from "./Header";
import Main from "./Main";
import { fetchTenantConfiguration } from "../../../Redux/slices/tenantConfigurationSlice";
import { fetchProperties } from "../../../Redux/slices/propertiesSlice";
import { fetchTenantName } from "../../../Redux/slices/tenantNameSlice";
import { useSearchParams } from "react-router-dom";
import { fetchDateCalenderRates } from "../../../Redux/slices/dateCalenderRatesSlice";

const Landing = () => {
  const tenantNameState = useAppSelector((state) => state.tenantNameState.value);
  const themeState = useAppSelector((state) => state.themeState.value);
  const tenantConfigurationState = useAppSelector((state) => state.tenantConfigurationState.value);
  const propertiesState = useAppSelector((state) => state.propertiesState.value);
  let dateCalenderRatesState = useAppSelector((state) => state.dateCalenderRatesState.value);

  let selectedPropertyState = useAppSelector(
    (state) => state.selectedPropertyState.value
  );
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const guestCountState = useAppSelector(
    (state) => state.guestCountState.value
  );
  let selectedRoomCountState = useAppSelector(
    (state) => state.selectedRoomCountState.value
  );
  const bedCountState = useAppSelector((state) => state.bedCountState.value);
  const selectedDatesState = useAppSelector(
    (state) => state.selectedDatesState.value
  );
  const roomTypesState = useAppSelector((state) => state.roomTypesState.value);

  useEffect(() => {    
    dispatch(fetchTenantName());
    dispatch(fetchTheme());
    dispatch(fetchTenantConfiguration());
    dispatch(fetchProperties());
    dispatch(fetchDateCalenderRates());

    if(localStorage.getItem('totalGuests') == null) localStorage.setItem('totalGuests','1');
    if(localStorage.getItem('adultsCount') == null) localStorage.setItem('adultsCount','1');
    if(localStorage.getItem('teensCount') == null) localStorage.setItem('teensCount','0');
    if(localStorage.getItem('kidsCount') == null) localStorage.setItem('kidsCount','0');
    if(localStorage.getItem('selectedRoomCountState') == null) localStorage.setItem('selectedRoomCountState', '1');
    if(localStorage.getItem('bedCountState') == null) localStorage.setItem('bedCountState', '1');
    if(localStorage.getItem('checkInDate') == null) localStorage.setItem('checkInDate', selectedDatesState.checkInDate.toISOString().split("T")[0] +
    "T00:00:00.000Z");
    if(localStorage.getItem('checkOutDate') == null) localStorage.setItem('checkOutDate', selectedDatesState.checkOutDate.toISOString().split("T")[0] +
    "T00:00:00.000Z");
    if(localStorage.getItem('propertyId') == null) localStorage.setItem('propertyId', '1');
    let propertyId = localStorage.getItem('propertyId') != null ? localStorage.getItem('propertyId') : selectedPropertyState.id;
    let checkInDate = localStorage.getItem('checkInDate') != null ? localStorage.getItem('checkInDate') : selectedDatesState.checkInDate.toISOString().split('T')[0] + 'T00:00:00.000Z';
    let checkOutDate = localStorage.getItem('checkOutDate') != null ? localStorage.getItem('checkOutDate') : selectedDatesState.checkOutDate.toISOString().split('T')[0] + 'T00:00:00.000Z';
    let totalGuests = localStorage.getItem('totalGuests') != null ? localStorage.getItem('totalGuests') : guestCountState.adultsCount + guestCountState.teensCount + guestCountState.kidsCount;
    let totalBeds = localStorage.getItem('bedCountState') != null ? localStorage.getItem('bedCountState'): bedCountState.bedCount;
    let totalRooms = localStorage.getItem('selectedRoomCountState') != null ? localStorage.getItem('selectedRoomCountState') : selectedRoomCountState;

    let newQuery = `?property/${propertyId}/search/rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guests=${totalGuests}&beds=${totalBeds}&rooms=${totalRooms}`;

      setSearchParams({
        query: newQuery
      })
  }, []);

  
  return (
    <div id="landingPageRoot">
      <Header
        themeState={themeState}
        tenantName={tenantNameState.name}
        languageIcon={languageIcon}
        currencyIcon={currencyIcon}
      />
      <Main
        themeState={themeState}
        propertyOptions={propertiesState}
        accessibleIcon={accessibleIcon}
        tenantConfigurationState={tenantConfigurationState}
        searchParam = {searchParams.get('query')}
        dateCalenderRatesState={dateCalenderRatesState}
      />
    </div>
  );
};

export default Landing;

import "./css/Room.css";
import Header from "../LandingPage/Header";
import languageIcon from "../../../assets/language.svg";
import currencyIcon from "../../../assets/currency.svg";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { useEffect, useRef, useState } from "react";
import { fetchTheme } from "../../../Redux/slices/themeSlice";
// import accessibleIcon from "../../../assets/accessible.svg";
import axios from "axios";
import BgImage from "./BgImage";
import StatusBar from "./StatusBar";
import { fetchTenantConfiguration } from "../../../Redux/slices/tenantConfigurationSlice";
import { fetchProperties } from "../../../Redux/slices/propertiesSlice";
import Navbar from "./Navbar";
import Results from "./Results";
import { fetchRoomTypes } from "../../../Redux/slices/roomTypesSlice";
import RoomTypeModal from "./RoomTypeModal";
import { fetchRoomAmenities } from "../../../Redux/slices/roomAmenitiesSlice";
import { fetchPromotions } from "../../../Redux/slices/promotionsSlice";
// import { roomCountSlice } from "../../../Redux/slices/roomCountSlice";
// import roomCardSlice from "../../../Redux/slices/roomCardSlice";
import { fetchdealsAndPackages } from "../../../Redux/slices/dealsAndPackagesSlice";
import { useSearchParams } from "react-router-dom";
import { fetchDateCalenderRates } from "../../../Redux/slices/dateCalenderRatesSlice";
import { fetchRoomTypeRoomRates } from "../../../Redux/slices/roomTypeRoomRateSlice";
import { setShowTripItenary } from "../../../Redux/slices/tripItenarySlice";

function Room() {
  const guestCountState = useAppSelector(
    (state) => state.guestCountState.value
  );
  const tenantNameState = useAppSelector(
    (state) => state.tenantNameState.value
  );
  const themeState = useAppSelector((state) => state.themeState.value);
  const tenantConfigurationState = useAppSelector(
    (state) => state.tenantConfigurationState.value
  );
  const roomCountState = useAppSelector((state) => state.roomCountState.value);
  const bedCountState = useAppSelector((state) => state.bedCountState.value);
  const selectedDatesState = useAppSelector(
    (state) => state.selectedDatesState.value
  );
  const roomTypesState = useAppSelector((state) => state.roomTypesState.value);
  const dispatch = useAppDispatch();

  let selectedPropertyState = useAppSelector(
    (state) => state.selectedPropertyState.value
  );
  let propertyId = selectedPropertyState.id;
  let checkInDate =
    selectedDatesState.checkInDate.toISOString().split("T")[0] +
    "T00:00:00.000Z";
  let checkOutDate =
    selectedDatesState.checkOutDate.toISOString().split("T")[0] +
    "T00:00:00.000Z";
  let totalGuests =
    guestCountState.adultsCount +
    guestCountState.teensCount +
    guestCountState.kidsCount;
  let totalBeds = bedCountState.bedCount;
  let selectedRoomCountState = useAppSelector(
    (state) => state.selectedRoomCountState.value
  );
  let totalRooms = selectedRoomCountState;

  let dateCalenderRatesState = useAppSelector(
    (state) => state.dateCalenderRatesState.value
  );

  let obj = {
    propertyId,
    checkInDate,
    checkOutDate,
    totalGuests,
    totalBeds,
    totalRooms,
  };

  const [searchParams, setSearchParams] = useSearchParams();

  function getQueryVariable(variable: string, query: any) {
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  }

  function getUrlQueryVariable(variable: string, query: any) {
    var vars = query.split("?");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1].split("&")[0];
      }
    }
    return false;
  }
  function getPrpIdQueryVariable(variable: string, query: any) {
    var vars = query.split("/");
    if (vars != null) return vars[1];
    return false;
  }

  useEffect(() => {
    if (localStorage.getItem("promotion") == null)
      dispatch(setShowTripItenary(false));
    dispatch(fetchTheme());
    dispatch(fetchTenantConfiguration());
    dispatch(fetchProperties());
    dispatch(fetchDateCalenderRates());

    if (localStorage.getItem("totalGuests") == null)
      localStorage.setItem("totalGuests", "1");
    if (localStorage.getItem("adultsCount") == null)
      localStorage.setItem("adultsCount", "1");
    if (localStorage.getItem("teensCount") == null)
      localStorage.setItem("teensCount", "0");
    if (localStorage.getItem("kidsCount") == null)
      localStorage.setItem("kidsCount", "0");
    if (localStorage.getItem("selectedRoomCountState") == null)
      localStorage.setItem("selectedRoomCountState", "1");
    if (localStorage.getItem("bedCountState") == null)
      localStorage.setItem("bedCountState", "1");
    if (localStorage.getItem("checkInDate") == null)
      localStorage.setItem(
        "checkInDate",
        selectedDatesState.checkInDate.toISOString().split("T")[0] +
          "T00:00:00.000Z"
      );
    if (localStorage.getItem("checkOutDate") == null)
      localStorage.setItem(
        "checkOutDate",
        selectedDatesState.checkOutDate.toISOString().split("T")[0] +
          "T00:00:00.000Z"
      );
    if (localStorage.getItem("propertyId") == null)
      localStorage.setItem("propertyId", "1");
    let propertyId =
      localStorage.getItem("propertyId") != null
        ? localStorage.getItem("propertyId")
        : selectedPropertyState.id;
    let checkInDate =
      localStorage.getItem("checkInDate") != null
        ? localStorage.getItem("checkInDate")
        : selectedDatesState.checkInDate.toISOString().split("T")[0] +
          "T00:00:00.000Z";
    let checkOutDate =
      localStorage.getItem("checkOutDate") != null
        ? localStorage.getItem("checkOutDate")
        : selectedDatesState.checkOutDate.toISOString().split("T")[0] +
          "T00:00:00.000Z";
    let totalGuests =
      localStorage.getItem("totalGuests") != null
        ? localStorage.getItem("totalGuests")
        : guestCountState.adultsCount +
          guestCountState.teensCount +
          guestCountState.kidsCount;
    let totalBeds =
      localStorage.getItem("bedCountState") != null
        ? localStorage.getItem("bedCountState")
        : bedCountState.bedCount;
    let totalRooms =
      localStorage.getItem("selectedRoomCountState") != null
        ? localStorage.getItem("selectedRoomCountState")
        : selectedRoomCountState;

    let obj = {
      propertyId,
      checkInDate,
      checkOutDate,
      totalGuests,
      totalBeds,
      totalRooms,
    };

    const query: any = searchParams.get("query");
    console.log(query);
    if (query != null) {
      let urlPropertId = getPrpIdQueryVariable("propertyId", query);
      if (urlPropertId != null)
        localStorage.setItem("propertyId", urlPropertId);
      // console.log(prpId);
      let urlCheckinDate = getUrlQueryVariable("checkInDate", query);
      if (urlCheckinDate != null)
        localStorage.setItem("checkInDate", urlCheckinDate);
      // console.log(chkinDate);
      let urlCheckOutDate = getQueryVariable("checkOutDate", query);
      if (urlCheckOutDate != null)
        localStorage.setItem("checkOutDate", urlCheckOutDate);
      // console.log(chkOutDate);
      let urlGuests = getQueryVariable("guests", query);
      if (urlGuests != null) localStorage.setItem("totalGuests", urlGuests);
      // console.log(gsts);
      let urlBeds = getQueryVariable("beds", query);
      if (urlBeds != null) localStorage.setItem("bedCountState", urlBeds);
      // console.log(bed);
      let urlRooms = getQueryVariable("rooms", query);
      if (urlRooms != null)
        localStorage.setItem("selectedRoomCountState", urlRooms);
      // console.log(room);
      let propertyId = urlPropertId;
      let checkInDate = urlCheckinDate;
      let checkOutDate = urlCheckOutDate;
      let totalGuests = urlGuests;
      let totalBeds = urlBeds;
      let totalRooms = urlRooms;

      let urlobj = {
        propertyId,
        checkInDate,
        checkOutDate,
        totalGuests,
        totalBeds,
        totalRooms,
      };

      dispatch(fetchRoomTypes(urlobj));
    } else dispatch(fetchRoomTypes(obj));
    dispatch(fetchRoomAmenities());
    let promotionsObj = { checkInDate, checkOutDate };
    dispatch(fetchPromotions(promotionsObj));
    dispatch(fetchdealsAndPackages(promotionsObj));
    dispatch(fetchRoomTypeRoomRates({ propertyId }));
  }, []);

  const [activeStep, setActiveStep] = useState(0);
  return (
    <div id="roomPageRoot">
      <Header
        themeState={themeState}
        tenantName={tenantNameState.name}
        languageIcon={languageIcon}
        currencyIcon={currencyIcon}
      />
      <BgImage />

      <StatusBar activeStep={activeStep} setActiveStep={setActiveStep}/>

      <Navbar
        guestCountState={guestCountState}
        themeState={themeState}
        roomCountState={roomCountState}
        bedCountState={bedCountState}
        selectedDatesState={selectedDatesState}
        tenantConfigurationState={tenantConfigurationState}
        dateCalenderRatesState={dateCalenderRatesState}
      />

      <Results searchParams={searchParams} roomTypesState={roomTypesState} />

      <RoomTypeModal />
    </div>
  );
}

export default Room;

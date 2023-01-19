import "./checkOutStyle/checkOut.css";
import Header from "../LandingPage/Header";
import languageIcon from "../../../assets/language.svg";
import currencyIcon from "../../../assets/currency.svg";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { useEffect, useRef, useState } from "react";
import { fetchTenantName } from "../../../Redux/slices/tenantNameSlice";
import { fetchTenantConfiguration } from "../../../Redux/slices/tenantConfigurationSlice";
import { fetchTheme } from "../../../Redux/slices/themeSlice";
import { fetchConfirmationInfoState } from "../../../Redux/slices/ConfirmationSlices/ConfirmationInfo";
import BookingLabel from "./BookingLabel";
import CheckOutInfo from "./CheckOutInfo";
import { useReactToPrint } from "react-to-print";
import { useSearchParams } from "react-router-dom";

function Checkout() {
  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState<string | false>(
    "roomTotalSummaryPanel"
  );

  const [searchParams, setSearchParams] = useSearchParams();
  

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const componentRef: any = useRef(null);

  const showPrintDialogueBox = useRef(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "confirmation",
    onAfterPrint: () => {
      showPrintDialogueBox.current = false;
      setExpanded("roomTotalSummaryPanel");
    },
  });

  const printButtonHandler = () => {
    showPrintDialogueBox.current = true;
    console.log(`showPrintDialogueBox.current ${showPrintDialogueBox.current}`);
    console.log(`Clicked ${componentRef.current}`);
    setExpanded("allPanels");
  };

  const tenantNameState = useAppSelector(
    (state) => state.tenantNameState.value
  );
  const themeState = useAppSelector((state) => state.themeState.value);

  const confirmationInfoState = useAppSelector((state) => state.confirmationInfoState.value);

  // const [bookingId,setBookingId] = useState<number>(949); 
  useEffect(() => {
    dispatch(fetchTenantName());
    dispatch(fetchTheme());
    dispatch(fetchTenantConfiguration());
    // setBookingId(Number(searchParams.get("BookingId")));
    // console.log((searchParams.get("BookingId")));
    // bookingId = Number(searchParams.get("BookingId"));
  }, []);

  useEffect(() => {
    if (showPrintDialogueBox.current) {
      console.log(`Inside useEffect() ${showPrintDialogueBox.current}`);
      setTimeout(() => handlePrint(), 500);
    }
  }, [expanded]);

  return (
    <div id="CheckOut">
      <div ref={componentRef}>
        <Header
          themeState={themeState}
          tenantName={tenantNameState.name}
          languageIcon={languageIcon}
          currencyIcon={currencyIcon}
        />
        <div>
          <BookingLabel printButtonHandler={printButtonHandler} />

          <CheckOutInfo
            // componentRef={componentRef}
          />
        </div>
      </div>
    </div>
  );
}

export default Checkout;

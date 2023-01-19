import "./styles/Confirmation.css";
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
import emailjs from "@emailjs/browser";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Confirmation = () => {
  const confirmationInfoState = useAppSelector((state)=> state.confirmationInfoState.value);
  const [searchParams, setSearchParams] = useSearchParams();
  const bookingId = searchParams.get("BookingId");

  const templateParams: any = {
    booking_id: confirmationInfoState.bookingId,
    guest_first_name: confirmationInfoState.guestDTO.firstName,
    guest_last_name: confirmationInfoState.guestDTO.lastName,
    url: bookingId,
    room_type_name: confirmationInfoState.roomTypeName,
    check_in_date: confirmationInfoState.checkInDate,
    check_out_date: confirmationInfoState.checkOutDate,
    nightly_rate: confirmationInfoState.nightlyRate,
    room_count: confirmationInfoState.roomCount,
    subtotal: confirmationInfoState.subtotal,
    tax: confirmationInfoState.taxSurchargeFeeTotal,
    due_at_resort: confirmationInfoState.amountDueAtResort,
    total_cost: confirmationInfoState.totalCost,
    guest_email: confirmationInfoState.guestDTO.email
  };

  const {REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE_ID, REACT_APP_API_KEY}:any = process.env;

  const sendEmail = () => {
    axios.post(
      // "http://ibe-t5-alb-181387793.eu-west-3.elb.amazonaws.com/api/booking/email/",
      `${process.env.REACT_APP_API_GATEWAY_BASE_URL}/booking/email`,
      templateParams,
      {headers:{"x-api-key": process.env.REACT_APP_API_GATEWAY_API_KEY ?? ``}}
    );
  };

  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState<string | false>(
    "roomTotalSummaryPanel"
  );

  // const [searchParams, setSearchParams] = useSearchParams();
    
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

  // const confirmationInfoState = useAppSelector(
  //   (state) => state.confirmationInfoState.value
  // );

  useEffect(() => {
    dispatch(fetchTenantName());
    dispatch(fetchTheme());
    dispatch(fetchTenantConfiguration());
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
          <BookingLabel sendEmail={sendEmail} printButtonHandler={printButtonHandler} />

          <CheckOutInfo
            // componentRef={componentRef}
            expanded={expanded}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Confirmation;

import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { fetchConfirmationInfoState } from "../../../Redux/slices/ConfirmationSlices/ConfirmationInfo";
import CancelationModal from "./CancelationModal";
import { useSearchParams } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import RoomDetailModal from "./RoomDetailModal";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  boxShadow: 10,
  p:4,
  borderRadius: 2
};

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const CheckoutInfo = ({ expanded, handleChange }: any) => {
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchConfirmationInfoState());
  // }, []);

  // const [expanded, setExpanded] = React.useState<string | false>("panel1");

  // const handleChange =(panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
  //     setExpanded(newExpanded ? panel : false);
  //   };

  const [searchParams, setSearchParams] = useSearchParams();
  const bookingId = searchParams.get("BookingId");

  const confirmationInfoState = useAppSelector(
    (state) => state.confirmationInfoState.value
  );

  let name = confirmationInfoState.roomTypeName
    .split("_")
    .join(" ")
    .toLowerCase();
  var words = name.split(" ");
  var CapitalizedWords: any[] = [];
  words.forEach((element: string | any[]) => {
    CapitalizedWords.push(
      element[0].toUpperCase() + element.slice(1, element.length)
    );
  });
  name = CapitalizedWords.join(" ");

  const monthName = (date: string) => {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let month = new Date(date);
    return months[month.getMonth()];
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div className="checkOutInfo">
      <div className="grid grid-cols-2 roomInfo">
        <div className="roomDetails">
          <div className="detLabel">Room 1 : {name}</div>
          <div className="grid grid-cols-2 detInfo">
            <div className="detInfo-Img"></div>
            <div className="grid grid-rows-2 detInfo-desc">
              <div className="dateBoxes">
                <div className="dateBox grid grid-rows-3">
                  <span className="checkDate">Check In</span>
                  <span className="date">
                    {
                      confirmationInfoState.checkInDate
                        .split("T")[0]
                        .split("-")[2]
                    }
                  </span>
                  <span className="year">
                    {monthName(confirmationInfoState.checkInDate)} 2022
                  </span>
                </div>
                <div className="dateBox grid grid-rows-3">
                  <span className="checkDate">Check Out</span>
                  <span className="date">
                    {
                      confirmationInfoState.checkOutDate
                        .split("T")[0]
                        .split("-")[2]
                    }
                  </span>
                  <span className="year">
                    {monthName(confirmationInfoState.checkOutDate)} 2022
                  </span>
                </div>
              </div>
              <div className="infoBox">
                <div className="infoBox-label">
                  ${confirmationInfoState.nightlyRate}{" "}
                  {confirmationInfoState.promotionDTO.title} Package
                </div>
                <div className="infoBox-content">
                  {confirmationInfoState.promotionDTO.description}
                  .Copy explaining the cancellation policy, if applicable
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sideBtns">
          {/* <div>
            <button className="roomBtn" onClick={handleOpen}>Room Details</button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <RoomDetailModal />
              </Box>
            </Modal>
          </div> */}
          {/* <div className="cancelBtn">Cancel</div> */}
          {confirmationInfoState.bookingStatusDTO.status!=="CANCELLED" && <CancelationModal />}
        </div>
      </div>

      {/* using Accordion */}
      <div>
        <Accordion
          expanded={
            expanded === "roomTotalSummaryPanel" || expanded === "allPanels"
          }
          onChange={handleChange("roomTotalSummaryPanel")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <span className="accordian-label">Room Total Summary</span>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid grid-cols-2 accordian">
              <div className="grid grid-rows-6 accordian-details">
                <span>Nightly rate</span>
                <span>Room count</span>
                <span>Subtotal</span>
                <span>Taxes, Surcharges, Fees</span>
                <span>Amount due at resort</span>
                <span>Total for stay</span>
              </div>
              <div className="grid grid-rows-6 accordian-value">
                <span>${confirmationInfoState.nightlyRate}</span>
                <span>{confirmationInfoState.roomCount}</span>
                <span>${confirmationInfoState.subtotal}</span>
                <span>${confirmationInfoState.taxSurchargeFeeTotal}</span>
                <span>${confirmationInfoState.amountDueAtResort}</span>
                <span>${confirmationInfoState.totalCost}</span>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={
            expanded === "guestInformationPanel" || expanded === "allPanels"
          }
          onChange={handleChange("guestInformationPanel")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <span className="accordian-label">Guest Information</span>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid grid-cols-2 accordian">
              <div className="grid grid-rows-4 accordian-details">
                <span>First Name</span>
                <span>Last Name</span>
                <span>Phone</span>
                <span>Email</span>
              </div>
              <div className="grid grid-rows-4 accordian-value">
                <span>{confirmationInfoState.guestDTO.firstName}</span>
                <span>{confirmationInfoState.guestDTO.lastName}</span>
                <span>{confirmationInfoState.guestDTO.phone}</span>
                <span>{confirmationInfoState.guestDTO.email}</span>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={
            expanded === "billingInformationPanel" || expanded === "allPanels"
          }
          onChange={handleChange("billingInformationPanel")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <span className="accordian-label">Billing Information</span>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid grid-cols-2 accordian">
              <div className="grid grid-rows-10 accordian-details">
                <span>First Name</span>
                <span>Last Name</span>
                <span>Address 1</span>
                <span>Address 2</span>
                <span>Country</span>
                <span>State</span>
                <span>City</span>
                <span>Zip</span>
                <span>Phone</span>
                <span>Email</span>
              </div>
              <div className="grid grid-rows-10 accordian-value">
                <span>{confirmationInfoState.billingInfoDTO.firstName}</span>
                <span>{confirmationInfoState.billingInfoDTO.lastName}</span>
                <span>
                  {confirmationInfoState.billingInfoDTO.mailingAddress1}
                </span>
                <span>
                  {confirmationInfoState.billingInfoDTO.mailingAddress2}
                </span>
                <span>{confirmationInfoState.billingInfoDTO.country}</span>
                <span>{confirmationInfoState.billingInfoDTO.state}</span>
                <span>{confirmationInfoState.billingInfoDTO.city}</span>
                <span>{confirmationInfoState.billingInfoDTO.zip}</span>
                <span>{confirmationInfoState.billingInfoDTO.phone}</span>
                <span>{confirmationInfoState.billingInfoDTO.email}</span>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={
            expanded === "paymentInformationPanel" || expanded === "allPanels"
          }
          onChange={handleChange("paymentInformationPanel")}
        >
          <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
            <span className="accordian-label">Payment Information</span>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid grid-cols-2 accordian">
              <div className="grid grid-rows-2 accordian-details">
                <span>Card Number</span>
                {/* <span>Name</span> */}
              </div>
              <div className="grid grid-rows-2 accordian-value">
                <span>{confirmationInfoState.paymentCardNumber}</span>
                {/* <span>XXX.xx</span> */}
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default CheckoutInfo;

// expanded={expanded === 'panel1'}  onChange={handleChange('panel1')}

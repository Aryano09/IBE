import React, { useEffect } from "react";
import Header from "../LandingPage/Header";
import languageIcon from "../../../assets/language.svg";
import currencyIcon from "../../../assets/currency.svg";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { fetchTenantName } from "../../../Redux/slices/tenantNameSlice";
import { fetchTheme } from "../../../Redux/slices/themeSlice";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";
import { fetchMyBookingsState } from "../../../Redux/slices/myBookingsSlice";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "./styles/myBookingsStyle.css";

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

const MyBookings = () => {
  const dispatch = useAppDispatch();
  const tenantNameState = useAppSelector(
    (state) => state.tenantNameState.value
  );
  const myBookingsState = useAppSelector(
    (state) => state.myBookingsState.value
  );
  const themeState = useAppSelector((state) => state.themeState.value);
  const userState = useAppSelector((state) => state.userState.value);
  const navigate = useNavigate();
  useEffect(() => {
    // let username = localStorage.getItem("loggedInUsername");
    let username = sessionStorage.getItem("loggedInUsername");
    if (username === null || username === undefined || username.length === 0) {
      alert("Please login first and then see your bookings");
      navigate("/Login");
    }
    dispatch(fetchTenantName());
    dispatch(fetchTheme());
    dispatch(fetchMyBookingsState(username));
  }, []);

  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
      console.log(panel);
    };

  // const confirmationInfoState = useAppSelector(
  //   (state) => state.confirmationInfoState.value
  // );
  return (
    <div id="myBookingsRoot">
      <Header
        themeState={themeState}
        tenantName={tenantNameState.name}
        languageIcon={languageIcon}
        currencyIcon={currencyIcon}
      ></Header>
      {myBookingsState[1] == true ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : null}
      <div className="myBookingsContainer">
        <div className="myBookingsBox">
          {myBookingsState[0] == null ||
          myBookingsState[0] == undefined ||
          myBookingsState[0].length === 0 ? (
            <>No bookings done yet</>
          ) : null}
          {myBookingsState[0] &&
            myBookingsState[0].map((confirmationInfoState, index) => {
              return (
                <Accordion
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Typography>
                      Booking#{confirmationInfoState.bookingId}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Room type: {confirmationInfoState.roomTypeName}
                    </Typography>
                    <Typography>
                      Total guests:{" "}
                      {confirmationInfoState.adultCount +
                        confirmationInfoState.childCount}
                    </Typography>
                    <Typography>
                      Check in: {confirmationInfoState.checkInDate}
                    </Typography>
                    <Typography>
                      Check out: {confirmationInfoState.checkOutDate}
                    </Typography>
                    <Typography>
                      Total cost: ${confirmationInfoState.totalCost}
                    </Typography>
                    <Box
                      sx={{
                        typography: "body1",
                        "& > :not(style) + :not(style)": {
                          ml: 2,
                        },
                      }}
                    >
                      <Link
                        href={`http://d2yxpb5j4hp3m5.cloudfront.net/Booking/Confirmation?BookingId=${confirmationInfoState.encryptedBookingId}`}
                      >
                        Confirmation Link
                      </Link>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;

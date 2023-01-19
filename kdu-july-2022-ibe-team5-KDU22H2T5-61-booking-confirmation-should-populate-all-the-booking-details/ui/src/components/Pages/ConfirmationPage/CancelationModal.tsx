import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAppSelector } from "../../../Redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  outline: 0,
};

const CancelationModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [otp, setOTP] = React.useState("");
  const [cancelAPIResponse, setCancelAPIResponse] = React.useState("");

  const confirmationInfoState = useAppSelector(
    (state) => state.confirmationInfoState.value
  );

  const getOtp = async (e: any) => {
    e.preventDefault();
    console.log(confirmationInfoState.guestDTO.email);

    const templateParams: any = {
      booking_id: confirmationInfoState.bookingId,
      to_email: confirmationInfoState.guestDTO.email,
    };

    axios.post(
      // "http://ibe-t5-alb-181387793.eu-west-3.elb.amazonaws.com/cancellation/otp",
      `${process.env.REACT_APP_API_GATEWAY_BASE_URL}/cancellation/otp`,
      templateParams,
      {headers:{"x-api-key": process.env.REACT_APP_API_GATEWAY_API_KEY ?? ``}}
    )
    .then(res => {setCancelAPIResponse("OTP sent");});
  };

  const cancelBooking = async (e: any) => {
    e.preventDefault();
    if (otp === `` || otp === undefined || otp.length == 0) {
      alert("Please enter something as the OTP");
    } else {
      console.log(`Entered OTP: ${otp}`);

      let bookingId = confirmationInfoState.bookingId;
      let apiResponse;
      axios
        .post(
          `${process.env.REACT_APP_API_GATEWAY_BASE_URL}/cancellation/otp/booking/${bookingId}/cancel`,
          null,
          { params: { otp }, headers:{"x-api-key": process.env.REACT_APP_API_GATEWAY_API_KEY ?? ``} }
        )
        .then((res) => {
          apiResponse = res.data;
          setCancelAPIResponse(apiResponse);
        })
        .catch((err) =>
          console.warn(`Some error occured in cancellation API, `, err)
        );
    }
  };

  const otpResponseElement = () => {
    if (cancelAPIResponse === "0") {
      return (
        <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-red-500">
          You have {cancelAPIResponse} attempts left. Please get OTP again.
        </Typography>
      );
    } else if (cancelAPIResponse === "CANCELLED") {
      return null;
    } 
    else if (cancelAPIResponse === "No OTP found for the booking"){
      return (
        <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-red-500">
          {cancelAPIResponse}. Please get an OTP and try again.
        </Typography>
      );
    }
    else if (cancelAPIResponse === "OTP sent"){
      return (
        <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-green-500">
          {cancelAPIResponse}.
        </Typography>
      );
    }
    else {
      return (
        <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-red-500">
          Please enter the correct OTP. You have {cancelAPIResponse} chances left.
        </Typography>
      );
    }
  };

  React.useEffect(() => {
    console.log(`OTP: ${otp}`);
  }, [otp]);

  React.useEffect(() => {
    if(cancelAPIResponse === "CANCELLED"){
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  }, [cancelAPIResponse])

  return (
    <div className="cancelBtn">
      <Button className="roomBtn" onClick={handleOpen}>Cancel</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please get an OTP which will be sent to {confirmationInfoState.guestDTO.email} and authenticate to cancel booking.
          </Typography>
          <input
            type="text"
            placeholder="Enter OTP"
            name="otp"
            id="otpInput"
            className="mt-3"
            onChange={(e: any) => setOTP(e.target.value)}
          />
          {cancelAPIResponse === "" ? null : otpResponseElement()}
          <input
            type="button"
            id="otpGet"
            value="Get OTP"
            className="bg-blue-300 cursor-pointer hover:bg-blue-500 mt-6 w-max p-3 rounded-2xl"
            onClick={getOtp}
          />
          <input
            type="button"
            id="otpSubmit"
            value="Cancel Booking"
            className=" bg-green-300 cursor-pointer hover:bg-green-500 mt-6 ml-6 w-max p-3 rounded-2xl"
            onClick={cancelBooking}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default CancelationModal;

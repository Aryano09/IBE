import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import informationIcon from "../../../assets/tripItenary/information.svg";
import { useAppSelector } from "../../../Redux/hooks";
import { addDays } from "date-fns";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface taxModalProps {
  promoName: string;
  subTotal: number;
  resortFee: number;
  occupancyTax: number;
  dueNow: number;
  dueAtResort: number;
}

const TaxModal = (props: taxModalProps) => {
  const roomTypeRoomRateState = useAppSelector(
    (state) => state.roomTypeRoomRateState.value
  );
  const roomTypeLocalStorage: any = localStorage.getItem("roomType");
  const roomTypeName: string = JSON.parse(roomTypeLocalStorage).name;
  const checkInDate: any = localStorage.getItem("checkInDate");
  const checkOutDate: any = localStorage.getItem("checkOutDate");

  const roomRateElement = (date: string) => {
    return (
      <div className="roomRate">
        {date.split("T")[0]} ${roomTypeRoomRateState[roomTypeName][date]}/night
      </div>
    );
  };

  const roomRateElements = () => {
    const roomRateElementList = [];
    let date = addDays(new Date(checkInDate), 0).toISOString();
    while (Object.keys(roomTypeRoomRateState).length && date != checkOutDate) {
      roomRateElementList.push(roomRateElement(date));
      date = addDays(new Date(date), 1).toISOString();
    }
    return roomRateElementList;
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="informationIconContainer">
      <Button onClick={handleOpen}>
        <img src={informationIcon} alt="" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Rate Breakdown
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Room Type
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Nightly Rate (Per Room)
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.promoName}
          </Typography>
          {roomRateElements().map((element) => element)}
          <div
            className="packageTotalContainer grid justify-between"
            style={{ gridTemplateColumns: "auto auto" }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Room Total
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              ${props.subTotal.toFixed(2)}
            </Typography>
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Taxes and Fees (Per Room)
          </Typography>
          <div
            className="packageTotalContainer grid justify-between"
            style={{ gridTemplateColumns: "auto auto" }}
          >
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Resort Fee
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              ${props.resortFee.toFixed(2)}
            </Typography>
          </div>
          <div
            className="packageTotalContainer grid justify-between"
            style={{ gridTemplateColumns: "auto auto" }}
          >
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Occupancy Tax
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              ${props.occupancyTax.toFixed(2)}
            </Typography>
          </div>
          <div
            className="packageTotalContainer grid justify-between"
            style={{ gridTemplateColumns: "auto auto" }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Due now
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              ${props.dueNow.toFixed(2)}
            </Typography>
          </div>
          <div
            className="packageTotalContainer grid justify-between"
            style={{ gridTemplateColumns: "auto auto" }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Due at Resort
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              ${props.dueAtResort.toFixed(2)}
            </Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default TaxModal;

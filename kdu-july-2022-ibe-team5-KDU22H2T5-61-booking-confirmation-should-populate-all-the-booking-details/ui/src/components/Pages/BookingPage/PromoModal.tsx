import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import informationIcon from "../../../assets/tripItenary/information.svg";

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

const PromoModal = ({ promoName, promoDescription, subTotal }: any) => {
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
            {promoName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {promoDescription}
          </Typography>
          <div className="packageTotalContainer grid justify-between" style={{gridTemplateColumns: "auto auto"}}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Package Total
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              ${subTotal.toFixed(2)}
            </Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PromoModal;

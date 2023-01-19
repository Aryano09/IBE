import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

const Checkbox = ({ label }: any) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="checkbox-wrapper">
      <label>
        <input type="checkbox" />
        <span>
          <a onClick={handleOpen}>{label}</a>
        </span>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="tc-modal">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Terms and Conditions
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <p>* Do not use the guest rooms for purposes other than intended
              without authorization. </p>
              
              <p>* Do not light fire in the passage or guest
              rooms for heating or cooking. </p>
              
              <p>* To prevent fire, refrain from
              smoking on bed, in non-smoking rooms, and in any other places
              prone to catch fire.</p>
              
              <p>* The equipment and articles in guest rooms are
              strictly meant for the guests staying in the Hotel. Hence, inside
              the guest rooms, use of such equipment and articles by outsiders
              is prohibited. </p>
              
              <p>* Be careful not to move the articles in the Hotel or
              guest rooms from their fixed places without permission. </p>
              
              <p>* Do not change the position of the gadgets and fixtures in the Hotel or
              guest rooms without permission.</p>   
              
              
              <p>* Refrain from engaging into gambling or acts that violate public
              order and morals inside the Hotel or guest rooms.</p> 
              
              <p>* Do not distribute advertisement goods or sell articles to the other
              guests or collect donation or signatures from them inside the
              Hotel premises, without proper permission.</p> 
              
              <p>* Note that we may refuse stay to patients suffering from an illness that may cause
              discomfort of any kind to the other guests inside the Hotel.</p> 
              
              <p>* Do not leave your personal belongings in the passages or the lobby.
              Any acts of photography that may bother the other guests in the
              Hotel are strictly prohibited inside the Hotel or guest rooms.</p> 
              
              <p>* Any personal meetings should be held in the 1st floor lobby only. </p>
            </Typography>
          </Box>
        </Modal>
      </label>
    </div>
  );
};
export default Checkbox;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { setShowTripItenary } from "../../../../Redux/slices/tripItenarySlice";
import { setShowModal } from "../../../../Redux/slices/roomTypeModalSlice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SearchInput = ({ searchParam }: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchButtonClickHandler = () => {
    console.log(searchParam);
    dispatch(setShowTripItenary(false));
    dispatch(setShowModal(false));
  };
  const guestCountState = useAppSelector(
    (state) => state.guestCountState.value
  );

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const displaySearchButton = () => {
    if (
      guestCountState.adultsCount +
        guestCountState.teensCount +
        guestCountState.kidsCount >
      0
    ) {
      return (
        <Link
          to={`/rooms${searchParam}`}
          onClick={() => searchButtonClickHandler()}
        >
          <input
            className="hover:cursor-pointer z-50"
            id="searchButton"
            type="button"
            value="SEARCH"
            onClick={() => searchButtonClickHandler()}
          />
        </Link>
      );
    }
    return (
      <Stack spacing={2} sx={{ width: "100%" }}>
        <input
          className="hover:cursor-pointer z-50"
          id="searchButton"
          type="button"
          value="SEARCH"
          onClick={() => {
            searchButtonClickHandler();
            handleClick();
          }}
        />
        <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Please select at least 1 guest
          </Alert>
        </Snackbar>
      </Stack>
    );
  };

  return displaySearchButton();
};

export default SearchInput;

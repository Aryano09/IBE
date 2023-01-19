import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import starIcon from "../../../assets/star.svg";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";
import { fetchRoomTypeReviews } from "../../../Redux/slices/RoomTypeReviewsSlice";
import axios from "axios";
import { fetchRoomTypeRatings } from "../../../Redux/slices/roomTypeRatingsSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  outline: 0,
};

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const Review = ({
  roomTypeName,
  roomTypeId,
  averageRating,
  setAverageRating,
  totalRatings,
  setTotalRatings,
}: any) => {
  const [progress, setProgress] = React.useState(10);
  // const [averageRating, setAverageRating] = useState(0);
  // const [totalRatings, setTotalRatings] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    if (Object.keys(roomTypeRatingsState.roomTypeRatingDTOHashMap).length) {
      console.log(
        roomTypeRatingsState.roomTypeRatingDTOHashMap[roomTypeId.toString()]
      );
      if (
        !!roomTypeRatingsState.roomTypeRatingDTOHashMap[roomTypeId.toString()]
      ) {
        console.log(
          "Average rating: ",
          roomTypeRatingsState.roomTypeRatingDTOHashMap[roomTypeId.toString()][
            "averageRating"
          ]
        );
        console.log(
          "Total ratings: ",
          roomTypeRatingsState.roomTypeRatingDTOHashMap[roomTypeId.toString()][
            "count"
          ]
        );
        setAverageRating(
          roomTypeRatingsState.roomTypeRatingDTOHashMap[roomTypeId.toString()][
            "averageRating"
          ]
        );
        setTotalRatings(
          roomTypeRatingsState.roomTypeRatingDTOHashMap[roomTypeId.toString()][
            "count"
          ]
        );
      } else {
        console.log("Average rating: ", averageRating);
        console.log("Total ratings: ", totalRatings);
      }
    }
    let obj = { roomTypeId };
    console.log(`fetching reviews for room type id: ${roomTypeId}`);
    dispatch(fetchRoomTypeReviews(obj));
    setOpen(true);
  };
  const handleClose = () => {
    if (Object.keys(roomTypeRatingsState.roomTypeRatingDTOHashMap).length) {
      console.log(
        roomTypeRatingsState.roomTypeRatingDTOHashMap[roomTypeId.toString()]
      );
      if (
        !!roomTypeRatingsState.roomTypeRatingDTOHashMap[roomTypeId.toString()]
      ) {
        console.log(
          "Average rating: ",
          roomTypeRatingsState.roomTypeRatingDTOHashMap[roomTypeId.toString()][
            "averageRating"
          ]
        );
        console.log(
          "Total ratings: ",
          roomTypeRatingsState.roomTypeRatingDTOHashMap[roomTypeId.toString()][
            "count"
          ]
        );
        setAverageRating(
          roomTypeRatingsState.roomTypeRatingDTOHashMap[roomTypeId.toString()][
            "averageRating"
          ]
        );
        setTotalRatings(
          roomTypeRatingsState.roomTypeRatingDTOHashMap[roomTypeId.toString()][
            "count"
          ]
        );
      } else {
        console.log("Average rating: ", averageRating);
        console.log("Total ratings: ", totalRatings);
      }
    }
    setOpen(false);
  };
  const [value, setValue] = React.useState<number | null>(2);
  const [reviewTextValue, setReviewTextValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewTextValue(event.target.value);
  };
  const userState = useAppSelector((state) => state.userState.value);
  const dispatch = useAppDispatch();

  const reviewSubmitButtonHandler = () => {
    let description = reviewTextValue;
    let rating = value;
    let username = sessionStorage.getItem("loggedInUsername") + ``;
    if (description.length > 0) {
      console.log(`roomTypeId: ${roomTypeId}`);
      console.log(`description: ${description}`);
      console.log(`rating: ${rating}`);
      console.log(`username: ${username}`);

      const requestBody = {
        roomTypeId: roomTypeId,
        description: description,
        rating: rating,
        username: username,
      };

      axios
        .post(
          // "http://localhost:8080/api/config/room/type/review",
          `${process.env.REACT_APP_API_GATEWAY_BASE_URL}/rooms/type/review`,
          requestBody,
          {
            headers: {
              "x-api-key": process.env.REACT_APP_API_GATEWAY_API_KEY ?? ``,
            },
          }
        )
        .then((response) => {
          console.log(response);
          let obj = { roomTypeId };
          dispatch(fetchRoomTypeReviews(obj));
          dispatch(fetchRoomTypeRatings());
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert(`Please give some description to post a review.`);
    }
  };

  const roomTypeReviewsState = useAppSelector(
    (state) => state.roomTypeReviewsState.value
  );

  const roomTypeRatingsState = useAppSelector(
    (state) => state.roomTypeRatingsState.value
  );

  return (
    <>
      <div
        className="rc-header-ratrev col-span-1 cursor-pointer"
        onClick={handleOpen}
      >
        <div className="rc-header-rating font-bold">
          <svg
            className="h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg>
          {averageRating}
        </div>
        <div className="rc-header-review">{totalRatings} Reviews</div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="font-extrabold"
          >
            {roomTypeName} Reviews
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <div className="scrollBackground relative">
            <div className="scrollDiv inline-block">
              <div className="scrollReviews">
                {/* {Array.apply(null, Array(15)).map(() => {
                  return (
                    <div className="reviewItem">
                      <span className="rating">
                        <img
                          className="inline h-3 align-baseline"
                          src={starIcon}
                          alt=""
                        />
                        3.5
                      </span>
                      <span className="review ml-2">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Quae corporis, commodi fugit itaque repellat rem
                        fugiat facilis? Quibusdam, odit reprehenderit!
                      </span>
                      <span className="reviewAuthor ml-4">
                        --- by Rohit Ghosh
                      </span>
                    </div>
                  );
                })} */}
                {roomTypeReviewsState.roomTypeReviewDTOList.map(
                  (roomTypeReviewDTO) => {
                    return (
                      <div className="reviewItem">
                        <span className="rating">
                          {roomTypeReviewDTO.rating}
                          <img
                            className="inline h-3 align-baseline"
                            src={starIcon}
                            alt=""
                          />
                        </span>
                        <span className="review ml-2">
                          {roomTypeReviewDTO.description}
                        </span>
                        <span className="reviewAuthor ml-4">
                          --- by {roomTypeReviewDTO.username}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <div className="newReview inline-block p-2 absolute top-0 right-0">
              <Box
                sx={{
                  "& > legend": { mt: 2 },
                }}
              >
                <Typography component="legend">Rating</Typography>
                <Rating
                  name="no-value"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Box>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    id="outlined-textarea"
                    label="Review description"
                    inputProps={{ maxLength: 200 }}
                    placeholder="maximum 200 characters"
                    multiline
                    onChange={handleChange}
                    margin="normal"
                  />
                </div>
              </Box>
              <Stack direction="row" spacing={2}>
                {sessionStorage.getItem("loggedInUsername") !== null ? (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={reviewSubmitButtonHandler}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button variant="contained" color="success" disabled>
                    Submit
                  </Button>
                )}
              </Stack>
              {sessionStorage.getItem("loggedInUsername") !== null ? null : (
                <Stack direction="column" spacing={2}>
                  <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2 }}
                    className="text-red-500"
                  >
                    Please login to post a review.
                  </Typography>
                  <Link to="/Login">
                    <Button variant="contained" color="success">
                      Login
                    </Button>
                  </Link>
                </Stack>
              )}
              <div className="ratingsAggregate p-2 grid">
                {Array.apply(null, Array(5)).map((element, index) => {
                  return (
                    <div className="starRating h-8">
                      <Box sx={{ width: "100%" }}>
                        <span className="ratingText">{index + 1} star</span>
                        <LinearProgressWithLabel
                          value={
                            roomTypeReviewsState.ratingsCountPercentage[index]
                          }
                        />
                      </Box>
                    </div>
                  );
                })}

                {/* <div className="starRating h-8">
                  <Box sx={{ width: "100%" }}>
                    <span className="ratingText">1 star</span>
                    <LinearProgressWithLabel value={progress} />
                  </Box>
                </div> */}
                {/* <div className="starRating h-8">
                  <Box sx={{ width: "100%" }}>
                    <span className="ratingText">2 star</span>
                    <LinearProgressWithLabel value={progress} />
                  </Box>
                </div> */}
                {/* <div className="starRating h-8">
                  <Box sx={{ width: "100%" }}>
                    <span className="ratingText">3 star</span>
                    <LinearProgressWithLabel value={progress} />
                  </Box>
                </div> */}
                {/* <div className="starRating h-8">
                  <Box sx={{ width: "100%" }}>
                    <span className="ratingText">4 star</span>
                    <LinearProgressWithLabel value={progress} />
                  </Box>
                </div> */}
                {/* <div className="starRating h-8">
                  <Box sx={{ width: "100%" }}>
                    <span className="ratingText">5 star</span>
                    <LinearProgressWithLabel value={progress} />
                  </Box>
                </div> */}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Review;

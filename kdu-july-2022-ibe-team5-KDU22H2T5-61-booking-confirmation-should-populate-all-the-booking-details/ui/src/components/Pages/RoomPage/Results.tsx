import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { setShowTripItenary } from "../../../Redux/slices/tripItenarySlice";
import TripItenary from "../BookingPage/TripItenary";
import Filter from "./Filter";
import RoomCard from "./RoomCard";
import sortIcon from "../../../assets/sortIcon.png";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { sortRoomTypesByPrice } from "../../../Redux/slices/roomTypesSlice";
import { togglePriceSortWay } from "../../../Redux/slices/roomTypeSorterSlice";
import { fetchRoomTypeRatings } from "../../../Redux/slices/roomTypeRatingsSlice";

const Results = ({ searchParams, roomTypesState }: any) => {
  const tripItenaryState = useAppSelector(
    (state) => state.tripItenaryState.value
  );
  const dispatch = useAppDispatch();
  const resultsTemplateColumnsItenaryFalse = "20.347222222vw auto";
  const resultsTemplateColumnsItenaryTrue = "20.347222222vw auto auto";
  const cardsContainerColumnsItenaryFalse = "auto auto auto";
  const cardsContainerColumnsItenaryTrue = "auto auto";
  const [resultsTemplateColumnsStyle, setResultsTemplateColumsStyle] = useState(
    tripItenaryState.showTripItenary
      ? resultsTemplateColumnsItenaryTrue
      : resultsTemplateColumnsItenaryFalse
  );
  // const roomTypesState = useAppSelector((state) => state.roomTypesState.value);

  useEffect(() => {
    if (localStorage.getItem("promotion") == null)
      dispatch(setShowTripItenary(false));
    dispatch(fetchRoomTypeRatings());
  }, []);

  const roomTypeFilterState = useAppSelector(
    (state) => state.roomTypeFilterState.value
  );

  const bedTypeFilterState = useAppSelector(
    (state) => state.bedTypeFilterState.value
  );

  const roomTypeSorterState = useAppSelector(
    (state) => state.roomTypeSorterState.value
  );

  const [age, setAge] = React.useState("");

  const handleChange = (event: any) => {
    setAge(event.target.value as string);
    if (roomTypeSorterState.priceSortWay === "ASC") {
      dispatch(sortRoomTypesByPrice("DSC"));
      dispatch(togglePriceSortWay());
    } else if (roomTypeSorterState.priceSortWay === "DSC") {
      dispatch(sortRoomTypesByPrice("ASC"));
      dispatch(togglePriceSortWay());
    }
  };

  const filteredRoomTypeState = roomTypesState
  .filter((roomType: any) => {
    if (roomTypeFilterState.filterList.length === 0) return true;
    return roomTypeFilterState.filterList.indexOf(roomType.name) > -1;
  })
  .filter((roomType: any) => {
    if (bedTypeFilterState.filterList.length === 0) return true;
    else if (
      bedTypeFilterState.filterList.indexOf("SINGLE") > -1 &&
      bedTypeFilterState.filterList.indexOf("DOUBLE") > -1
    )
      return true;
    else if (bedTypeFilterState.filterList.indexOf("SINGLE") > -1)
      return roomType.singleBed > 0;
    else if (bedTypeFilterState.filterList.indexOf("DOUBLE") > -1)
      return roomType.doubleBed > 0;
  });

  return (
    <div
      className="Results grid"
      style={{ gridTemplateColumns: resultsTemplateColumnsStyle }}
    >
      <Filter />
      <div className="result-header grid">
        <div className="cardsHeaderContainer grid justify-between">
          <div className="cardsHeaderContainer-label col-span 1  text-2xl ml-5">
            Property Results
          </div>
          <div className="col-span-1">
            Showing 1-{roomTypesState.length} of {roomTypesState.length} Results
            <div className="sortContainer inline-block ml-2">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={roomTypeSorterState.priceSortWay}
                    label="Sort"
                    onChange={handleChange}
                  >
                    <MenuItem value={roomTypeSorterState.priceSortWay} onClick={(e) => handleChange(e)}>
                      Price
                      <div className="sortIconContainer inline-block">
                        <img src={sortIcon} alt="sort icon not found" />
                      </div>
                    </MenuItem>
                    {/* <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
        </div>
        <div
          className="cardsContainer grid"
          style={{
            gridTemplateColumns: tripItenaryState.showTripItenary
              ? cardsContainerColumnsItenaryTrue
              : cardsContainerColumnsItenaryFalse,
          }}
        >
          {roomTypesState && (filteredRoomTypeState.length > 0) && 
          filteredRoomTypeState.map((roomType: any) => (
              <RoomCard
                roomType={roomType}
                resultsTemplateColumnsItenaryTrue={
                  resultsTemplateColumnsItenaryTrue
                }
                setResultsTemplateColumsStyle={setResultsTemplateColumsStyle}
              />
            ))}
          {roomTypesState && (filteredRoomTypeState.length == 0) && (
            <div className="emptyFilter">
              <span>There are no rooms available for this congfiguration . Try changing the form inputs.</span>
            </div>
          )}
        </div>
      </div>
      {tripItenaryState.showTripItenary && (
        <TripItenary
          onSearchRoomsPage={true}
          // setShowTripItenary={setShowTripItenary}
          resultsTemplateColumnsItenaryTrue={resultsTemplateColumnsItenaryTrue}
          resultsTemplateColumnsItenaryFalse={
            resultsTemplateColumnsItenaryFalse
          }
          setResultsTemplateColumsStyle={setResultsTemplateColumsStyle}
          searchParams={searchParams}
        />
      )}
    </div>
  );
};

export default Results;

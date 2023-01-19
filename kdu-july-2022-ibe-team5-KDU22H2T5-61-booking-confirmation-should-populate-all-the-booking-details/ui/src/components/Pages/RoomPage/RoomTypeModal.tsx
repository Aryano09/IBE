import React from "react";
import { useAppSelector, useAppDispatch } from "../../../Redux/hooks";
import { setShowModal } from "../../../Redux/slices/roomTypeModalSlice";
import "./css/RoomModal.css";
import CarouselCard from "./CardForm/CarouselCard";
import maxCapacityIcon from "../../../assets/roomModal/maxCapacityIcon.svg";
import bedCapacityIcon from "../../../assets/roomModal/bedCapacityIcon.svg";
import amenitiesTickIcon from "../../../assets/roomModal/amenitiesTickIcon.svg";
import Promotions from "./Promotions";
import Amenity from "./Amenity";
import Deals from "./Deals";
import closeIcon from "../../../assets/roomModal/close-pngrepo-com.png"

const RoomTypeModal = () => {
  const dispatch = useAppDispatch();
  const promotions = useAppSelector((state) => state.promotionsState.value);
  const roomTypeModalState = useAppSelector(
    (state) => state.roomTypeModalState.value
  );
  const roomAmenitiesState = useAppSelector(
    (state) => state.roomAmenitiesState.value
  );
  const dealsAndPackagesState = useAppSelector((state) => state.dealsAndPackagesState.value);
  const roomType = roomTypeModalState.roomType;

  const bedCapacityTextBuilder = () => {
    if (roomType.singleBed === 0) {
      return `${roomType.doubleBed} double`;
    } else if (roomType.doubleBed === 0) {
      return `${roomType.singleBed} single`;
    } else {
      return `${roomType.singleBed} single or ${roomType.doubleBed} double`;
    }
  };

  // const amenitiesList = {
  //   1: "Wireless Internet Access",
  //   2: "In Room Safe",
  //   3: "Cable & Pay TV Channels",
  //   4: "Iron and Ironing Board",
  //   5: "Alarm Clock",
  //   6: "Writing Desk and Chair",
  //   7: "Hair Dryer",
  // };

  const amenitiesList = [
    "Wireless Internet Access",
    "In Room Safe",
    "Cable & Pay TV Channels",
    "Iron and Ironing Board",
    "Alarm Clock",
    "Writing Desk and Chair",
    "Hair Dryer",
  ];

  return (
    <>
      {roomTypeModalState.showModal && (
        <div
          id="modalRoot"
          className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-10"
        >
          <div className="modalContainer relative bg-white z-50">
            <div
              className="absolute top-5 right-5 bg-gray-300 p-3 rounded-full hover:bg-gray-400 transition-all cursor-pointer z-50"
              onClick={() => dispatch(setShowModal(false))}
            >
              <img
                // src="https://iconape.com/wp-content/png_logo_vector/cross-2.png"
                src={closeIcon}
                className="h-6 w-6"
                alt="cross-img-not-found"
              />
            </div>
            <div className="modal">
              <div className="carousel">
                <CarouselCard imageUrls={roomType.imageUrls} />
              </div>
              <div className="grid h-screen content">
                <div className="left grid">
                  <div className="specs grid">
                    <div className="maxCapacity grid">
                      <div className="icon">
                        <img src={maxCapacityIcon} alt="" />
                      </div>
                      <div className="maxCapacityText">
                        1 - {roomType.maxCapacity}
                      </div>
                    </div>
                    <div className="bedCapacity grid">
                      <div className="icon">
                        <img src={bedCapacityIcon} alt="" />
                      </div>
                      <div className="bedCapacityText">
                        {bedCapacityTextBuilder()}
                      </div>
                    </div>
                    <div className="area">{roomType.area} ft</div>
                  </div>
                  <div className="description">{roomType.description}</div>
                  <Promotions promotions={promotions} roomType={roomType} />
                  <Deals dealsAndPackagesState={dealsAndPackagesState} roomType={roomType} />
                </div>
                <div className="right">
                  <div className="amenitiesContainer grid">
                    <div className="amenityHeader grid">Amenities</div>
                    <div className="amenities grid">
                      {/* {amenitiesList.map((amenity, index) => (
                        <Amenity amenity={amenity} index={index} />
                      ))} */}
                      {roomTypeModalState.amenities.map((amenity, index) => (
                        <Amenity amenity={amenity} index={index} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomTypeModal;

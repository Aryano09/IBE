import React from "react";
import CarouselCard from "../RoomPage/CardForm/CarouselCard";


const RoomDetailModal = () => {
  return (
    <div>
      <div className="carousel" style={{height:500}}>
        {/* <CarouselCard  /> */}
        Images
      </div>
      <div className="grid grid-cols-[600px_400px]">
        <div>
          Descripion
        </div>
        <div>
          Amenities
        </div>
      </div>
    </div>
  );
};

export default RoomDetailModal;

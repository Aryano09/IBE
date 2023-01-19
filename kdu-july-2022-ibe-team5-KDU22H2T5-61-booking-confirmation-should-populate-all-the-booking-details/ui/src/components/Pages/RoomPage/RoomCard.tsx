import CarouselCard from "./CardForm/CarouselCard";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import {
  setRoomType,
  setShowModal,
  setAmenities,
} from "../../../Redux/slices/roomTypeModalSlice";
import RoomTypeModal from "./RoomTypeModal";
import Review from "./Review";
import { useEffect, useState } from "react";

const RoomCard = ({
  roomType,
  resultsTemplateColumnsItenaryTrue,
  setResultsTemplateColumsStyle,
}: any) => {
  const dispatch = useAppDispatch();
  const roomAmenitiesState = useAppSelector(
    (state) => state.roomAmenitiesState.value
  );

  let name = roomType.name.split("_").join(" ").toLowerCase();
  var words = name.split(" ");
  var CapitalizedWords: any[] = [];
  words.forEach((element: string | any[]) => {
    CapitalizedWords.push(
      element[0].toUpperCase() + element.slice(1, element.length)
    );
  });
  name = CapitalizedWords.join(" ");

  const updateAmenities = () => {
    const amenities: string[] = [];
    roomAmenitiesState.forEach((amenity, index) => {
      if (roomType.amenityIds.includes(amenity.id)) {
        amenities.push(amenity.name);
      }
    });
    dispatch(setAmenities(amenities));
  };
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const roomTypeRatingsState = useAppSelector(
    (state) => state.roomTypeRatingsState.value
  );
  useEffect(() => {
    let roomTypeId = roomType.roomTypeId;
    if(Object.keys(roomTypeRatingsState.roomTypeRatingDTOHashMap).length){
      console.log(roomTypeRatingsState.roomTypeRatingDTOHashMap[roomTypeId.toString()]);
      if(!!roomTypeRatingsState.roomTypeRatingDTOHashMap[roomTypeId.toString()]){
        console.log("Average rating: ",roomTypeRatingsState.roomTypeRatingDTOHashMap[roomTypeId.toString()]["averageRating"]);
        console.log("Total ratings: ",roomTypeRatingsState.roomTypeRatingDTOHashMap[roomTypeId.toString()]["count"]);
        setAverageRating(roomTypeRatingsState.roomTypeRatingDTOHashMap[roomTypeId.toString()]["averageRating"]);
        setTotalRatings(roomTypeRatingsState.roomTypeRatingDTOHashMap[roomTypeId.toString()]["count"]);
      }
      else{
        console.log("Average rating: ",averageRating);
        console.log("Total ratings: ", totalRatings);
      }
    }
  }, []);

  return (
    <div className="roomCard shadow-2xl grid grid-cols-1">
      <div className="rc-img-carousel">
        <CarouselCard imageUrls={roomType.imageUrls} />
      </div>
      <div className="rc-content">
        <div className="rc-header grid ">
          <div className="rc-header-title col-span-2">
            <span>{name}</span>
          </div>
          <Review roomTypeName={name} roomTypeId={roomType.roomTypeId} averageRating={averageRating} setAverageRating={setAverageRating} totalRatings={totalRatings} setTotalRatings={setTotalRatings}/>

          {/* <div className="rc-header-ratrev col-span-1">
          <div className="rc-header-rating font-bold"><svg className="h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>3.5</div>
          <div className="rc-header-review">125 Reviews</div>
        </div> */}
        </div>
        <div className="font-thin rc-location">
          <svg
            className="h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
          </svg>
          Near city center
        </div>
        <div className="rc-sp-deal grid grid-cols-3">
          <div className="rectangle col-span-2">
            <span>Special deal</span>
          </div>
          <div className="triangle"></div>
          <div></div>
        </div>
        {/* <div className="font-thin rc-promo">Save 10% when you book 2+ nights</div> */}
        <div className="rc-price grid">
          <div>
            <div className="font-normal">${roomType.basicNightlyRate}</div>
            <div className="font-thin">Per night</div>
          </div>
        </div>
        <div>
          <button
            className="rc-btn"
            onClick={() => {
              dispatch(setShowModal(true));
              dispatch(setRoomType(roomType));
              updateAmenities();
              setResultsTemplateColumsStyle(resultsTemplateColumnsItenaryTrue);
            }}
          >
            <span className="rc-btn-text">SELECT PROPERTY</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;

{
  /* <svg className="h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg> */
}

{
  /* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"/></svg> */
}

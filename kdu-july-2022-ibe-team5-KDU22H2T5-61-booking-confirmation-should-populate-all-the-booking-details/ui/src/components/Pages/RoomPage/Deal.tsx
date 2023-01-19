import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../Redux/hooks";
import { updateShowBillingInfo, updateShowPaymentInfo, updateShowTravellerInfo } from "../../../Redux/slices/BookingSlices/renderSlice";

const Deal = ({ promotion, roomType }: any) => {
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    localStorage.setItem('checkOutTime', JSON.stringify(new Date()));
    localStorage.setItem("promotion", JSON.stringify(promotion));
    dispatch(updateShowTravellerInfo(true));
    dispatch(updateShowBillingInfo(false));
    dispatch(updateShowPaymentInfo(false));
  }

  // useEffect(()=>{console.log("deals promotions: ",promotion);
  // },[])
  
  return (
    <div className="deal grid">
      <div className="dealInfo grid">
        <div className="dealTitle grid">{promotion.title}</div>
        <div className="dealDescription grid">{promotion.description}</div>
      </div>
      <div className="dealRate grid">
        <div className="dealRateContainer grid">
          <div className="rate grid">
            ${roomType.basicNightlyRate * promotion.priceFactor}
          </div>
          <div className="ratePerPerson grid">per night</div>
        </div>
        <div className="dealSelect grid cursor-pointer">
          <Link to="/Booking" onClick={handleSubmit}>
            <button
              className="dealSelectButton text-white"
            >
              Select package
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Deal;

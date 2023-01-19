import React from "react";
import { useAppSelector } from "../../../Redux/hooks";
import BillingInfoForm from "./BillingInfoForm";
import PaymentInfoForm from "./PaymentInfoForm";
import TravellerInfoForm from "./TravellerInfoForm";
import TripItenary from "./TripItenary";

const InfoForm = () => {
  const renderState = useAppSelector((state) => state.renderState.value);
  console.log(renderState);

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 infoFormStyle">
        {renderState.showTravellerInfo && <TravellerInfoForm />}
        {renderState.showBillingInfo && <BillingInfoForm />}
        {renderState.showPaymentInfo && <PaymentInfoForm />}        
      </div>
      <div>
        <TripItenary onSearchRoomsPage={false} />
      </div>
    </div>
  );
};

export default InfoForm;

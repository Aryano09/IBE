import React from "react";
import Deal from "./Deal";
import { setCurrentDeals } from "../../../Redux/slices/dealsCategorySlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { useState } from "react";

const Deals = ({ dealsAndPackagesState, roomType }: any) => {
  const [currentDealSelected, setCurrentDealSelected] = useState("kids");
  const dispatch = useAppDispatch();
  const dealsCategoryState = useAppSelector(
    (state) => state.dealsCategoryState.value
  );
  const categoryClassName = "category  cursor-pointer ";

  return (
    <div className="dealsAndPackages grid">
      <div className="heading grid">Deals & packages</div>
      <div className="categories grid">
        <div
        className={currentDealSelected == "kids" ? categoryClassName + "border-b border-orange-600" : categoryClassName}
          onClick={(e) => {
            dispatch(setCurrentDeals(dealsAndPackagesState.kids));
            setCurrentDealSelected("kids");
          }}
        >
          <h1>Kids Deals</h1>
        </div>
        <div
        className={currentDealSelected == "meals" ? categoryClassName + "border-b border-orange-600" : categoryClassName}
          onClick={(e) => {
            dispatch(setCurrentDeals(dealsAndPackagesState.meals));
            setCurrentDealSelected("meals")
          }}
        >
          <h1>Dinner Deals</h1>
        </div>
      </div>
      <div className="deals grid">
        {dealsCategoryState.currentDeals.map((promotion: any) => (
          <Deal promotion={promotion} roomType={roomType} />
        ))}
      </div>
    </div>
  );
};

export default Deals;

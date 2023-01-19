import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../Redux/hooks";
import { addDays } from "date-fns";
import {
  setDueAtResort,
  setDueNow,
  setDuration,
  setOccupancyTax,
  setPricePerRoomOnCheckInDate,
  setSubtotal,
  setTaxSurchargFeeTotal,
  setTotalAmount,
  setTotalResortFee,
} from "../../../Redux/slices/billSlice";
import informationIcon from "../../../assets/tripItenary/information.svg";
import PromoModal from "./PromoModal";
import TaxModal from "./TaxModal";
import { setShowTripItenary } from "../../../Redux/slices/tripItenarySlice";
import { setShowModal } from "../../../Redux/slices/roomTypeModalSlice";

const TripItenary = ({
  onSearchRoomsPage,
  resultsTemplateColumnsItenaryTrue,
  resultsTemplateColumnsItenaryFalse,
  setResultsTemplateColumsStyle,
  searchParams,
}: any) => {
  const dispatch = useAppDispatch();
  const promotionJson: any = localStorage.getItem("promotion");
  const promotion = JSON.parse(promotionJson);
  const billState = useAppSelector((state) => state.billState.value);
  const tenantConfigurationState = useAppSelector(
    (state) => state.tenantConfigurationState.value
  );
  const roomTypeModalState = useAppSelector(
    (state) => state.roomTypeModalState.value
  );
  const roomType = roomTypeModalState.roomType;
  const roomTypeLocalStorage: any = localStorage.getItem("roomType");
  const roomTypeRoomRateState = useAppSelector(
    (state) => state.roomTypeRoomRateState.value
  );
  const roomTypeName: string = JSON.parse(roomTypeLocalStorage).name;
  const checkInDate: any = localStorage.getItem("checkInDate");
  const checkOutDate: any = localStorage.getItem("checkOutDate");
  const formattedCheckInDate = new Date(checkInDate);
  const formattedCheckOutDate = new Date(checkOutDate);
  const checkInMonth = formattedCheckInDate.toLocaleString("default", {
    month: "short",
  });
  const checkInDay = formattedCheckInDate.toLocaleString("default", {
    day: "numeric",
  });
  const checkInYear = formattedCheckInDate.toLocaleString("default", {
    year: "numeric",
  });
  const checkOutMonth = formattedCheckOutDate.toLocaleString("default", {
    month: "short",
  });
  const checkOutDay = formattedCheckOutDate.toLocaleString("default", {
    day: "numeric",
  });
  const checkOutYear = formattedCheckOutDate.toLocaleString("default", {
    year: "numeric",
  });

  useEffect(() => {
    if (Object.keys(roomTypeRoomRateState).length) {
      let duration = 0;
      let subTotal = 0;
      let date = addDays(new Date(checkInDate), 0).toISOString();
      let pricePerRoomOnCheckInDate: number =
        roomTypeRoomRateState[roomTypeName][date];
      let dueNow =
        pricePerRoomOnCheckInDate *
        ((100 + tenantConfigurationState.occupancyTaxRate) / 100.0);
      while (
        Object.keys(roomTypeRoomRateState).length &&
        date != checkOutDate
      ) {
        console.log(`inside  date `, date);
        duration = duration + 1;
        subTotal = subTotal + roomTypeRoomRateState[roomTypeName][date];
        date = addDays(new Date(date), 1).toISOString();
      }
      console.log(`outside  date `, date);

      let occupancyTax =
        subTotal * (tenantConfigurationState.occupancyTaxRate / 100.0);
      let totalResortFee =
        tenantConfigurationState.resortFeePerRoomPerDay * duration;
      let totalAmount = subTotal + totalResortFee + occupancyTax;
      let dueAtResort = totalAmount - subTotal;
      let taxSurchargFeeTotal = totalResortFee + occupancyTax;
      console.log({
        dueNow,
        duration,
        subTotal,
        occupancyTax,
        totalResortFee,
        totalAmount,
        dueAtResort,
        taxSurchargFeeTotal,
      });

      dispatch(setPricePerRoomOnCheckInDate(pricePerRoomOnCheckInDate));
      dispatch(setDuration(duration));
      dispatch(setSubtotal(subTotal));
      dispatch(setDueNow(dueNow));
      dispatch(setOccupancyTax(occupancyTax));
      dispatch(setTotalResortFee(totalResortFee));
      dispatch(setTotalAmount(totalAmount));
      dispatch(setDueAtResort(dueAtResort));
      dispatch(setTaxSurchargFeeTotal(taxSurchargFeeTotal));
    }
  }, [roomTypeRoomRateState]);

  const roomRateElement = (date: string) => {
    return (
      <div className="roomRate">
        {date.split("T")[0]} ${roomTypeRoomRateState[roomTypeName][date]}/night
      </div>
    );
  };

  const roomRateElements = () => {
    const roomRateElementList = [];
    let date = addDays(new Date(checkInDate), 0).toISOString();
    while (Object.keys(roomTypeRoomRateState).length && date != checkOutDate) {
      roomRateElementList.push(roomRateElement(date));
      date = addDays(new Date(date), 1).toISOString();
    }
    return roomRateElementList;
  };

  const guestsStringBuilder = () => {
    let adultsCount = Number(localStorage.getItem("adultsCount"));
    let teensCount = Number(localStorage.getItem("teensCount"));
    let kidsCount = Number(localStorage.getItem("kidsCount"));
    let guests = ``;
    if (adultsCount > 0) {
      guests += `${adultsCount} adults `;
    }
    if (teensCount > 0) {
      guests += `${teensCount} teens `;
    }
    if (kidsCount > 0) {
      guests += `${kidsCount} kids `;
    }
    return guests;
  };

  return (
    <div id="tripItenary">
      <div
        className="itenaryContainer relative"
        style={{
          width: onSearchRoomsPage ? "22.91666666666667vw" : "27.7777777778vw",
        }}
      >
        <div className="removeButtonContainer absolute">
          <Link
            to={`/rooms`}
            onClick={() => {
              localStorage.removeItem("roomType");
              localStorage.removeItem("promotion");
              dispatch(setShowTripItenary(false));
              setResultsTemplateColumsStyle(resultsTemplateColumnsItenaryFalse);
            }}
          >
            <button
              onClick={() => {
                localStorage.removeItem("roomType");
                localStorage.removeItem("promotion");
                dispatch(setShowTripItenary(false));
                setResultsTemplateColumsStyle(
                  resultsTemplateColumnsItenaryFalse
                );
              }}
            >
              Remove
            </button>
          </Link>
        </div>
        <div className="itenaryContent grid">
          <div className="heading">Your Trip Itinery</div>
          <div className="tripDetailsContainer">
            <div className="tripDetails grid">
              <div className="propertyName">
                {localStorage.getItem("propertyName")}
              </div>
              <div className="dateGuests">
                {checkInMonth} {checkInDay} - {checkOutMonth} {checkOutDay},{" "}
                {checkOutYear} | {guestsStringBuilder()}
              </div>
              <div className="roomType">
                {JSON.parse(roomTypeLocalStorage).name}
              </div>
              {roomRateElements().map((element) => element)}
              <div className="roomCount">
                {localStorage.getItem("selectedRoomCountState")} rooms
              </div>
              <div className="specialPromo">
                {promotion.title}, $
                {billState.pricePerRoomOnCheckInDate.toFixed(2)}/night{" "}
                <PromoModal
                  promoName={promotion.title}
                  promoDescription={promotion.description}
                  subTotal={billState.subtotal}
                />
              </div>
            </div>
          </div>
          <div className="taxDetailsContainer relative">
            <div className="taxNameContainer absolute grid">
              <div className="taxName">Subtotal</div>
              <div className="taxName relative">
                Taxes, Surcharges, Fees{" "}
                {/* <div className="informationIconContainer">
                  <img src={informationIcon} alt="" />
                </div> */}
                <TaxModal
                  promoName={promotion.title}
                  subTotal={billState.subtotal}
                  resortFee={billState.totalResortFee}
                  occupancyTax={billState.occupancyTax}
                  dueNow={billState.dueNow}
                  dueAtResort={billState.dueAtResort}
                />
              </div>
              <div className="taxName">VAT</div>
            </div>
            <div className="taxAmountContainer absolute grid">
              <div className="taxAmount">${billState.subtotal.toFixed(2)}</div>
              <div className="taxAmount">
                ${billState.taxSurchargFeeTotal.toFixed(2)}
              </div>
              <div className="taxAmount">
                ${billState.occupancyTax.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="dueAmountsContainer relative">
            <div className="amountNameContainer absolute grid">
              <div className="amountName">Due Now</div>
              <div className="amountName">Due at Resort</div>
            </div>
            <div className="dueAmountContainer absolute grid">
              <div className="dueAmount">${billState.dueNow.toFixed(2)}</div>
              <div className="dueAmount">
                ${billState.dueAtResort.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="continueButtonContainer relative">
            {onSearchRoomsPage ? (
              <Link
                to="/booking"
                onClick={() => dispatch(setShowTripItenary(true))}
              >
                <div className="continueButton absolute">
                  <button>Go to checkout</button>
                </div>
              </Link>
            ) : (
              <Link
                to={`/rooms`}
                onClick={() => {dispatch(setShowTripItenary(true)); dispatch(setShowModal(false));}}
              >
                <div className="continueButton absolute">
                  <button>Continue shopping</button>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripItenary;

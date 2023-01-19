import React from "react";
import { useAppSelector, useAppDispatch } from "../../../../Redux/hooks";
import {
  incrementAdultsCount,
  incrementTeensCount,
  incrementKidsCount,
  decrementAdultsCount,
  decrementTeensCount,
  decrementKidsCount,
} from "../../../../Redux/slices/guestCountSlice";

const GuestOption = ({ optionName, englishOptionName }: any) => {
  const dispatch = useAppDispatch();
  const guestCountState = useAppSelector(
    (state) => state.guestCountState.value
  );
  const textsState = useAppSelector((state) => state.textsState.value);
  let count;
  let optionDescription:any;
  let incrementAction: any, decrementAction: any;
  if (englishOptionName.toLowerCase() === "adults") {
    count = guestCountState.adultsCount;
    incrementAction = incrementAdultsCount;
    decrementAction = decrementAdultsCount;
    optionDescription = textsState.adultsLabelDescription;
  } else if (englishOptionName.toLowerCase() === "teens") {
    count = guestCountState.teensCount;
    incrementAction = incrementTeensCount;
    decrementAction = decrementTeensCount;
    optionDescription = textsState.teensLabelDescription;
  } else if (englishOptionName.toLowerCase() === "kids") {
    count = guestCountState.kidsCount;
    incrementAction = incrementKidsCount;
    decrementAction = decrementKidsCount;
    optionDescription = textsState.kidsLabelDescription;
  }

//   function optionDescription(optionName: string) {
//     if (optionName.toLowerCase() === "adults") {
//       return `Ages 18+`;
//     } else if (optionName.toLowerCase() === "teens") {
//       return `Ages 13-17`;
//     } else if (optionName.toLowerCase() === "kids") {
//       return `Ages 0-12`;
//     }
//   }

  return (
    <div className="option grid grid-rows-1 grid-cols-2 justify-around items-center">
      <div className="optionNameDescription grid grid-cols-1">
        <div className="optionName font-bold">{optionName}</div>
        <div className="optionDescription">{optionDescription}</div>
      </div>
      <div className="valueChange grid grid-rows-1 grid-cols-3 justify-evenly items-center">
        <button
          className="decrement"
          onClick={(e) => {e.preventDefault(); dispatch(decrementAction());}}
        >
          -
        </button>
        <h1 className="text-center">{count}</h1>
        <button
          className="increment"
          onClick={(e) => {e.preventDefault(); dispatch(incrementAction());}}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default GuestOption;

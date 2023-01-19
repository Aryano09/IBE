import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import format from "date-fns/format";
import { addDays, isWeekend } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useAppDispatch } from "../../../../Redux/hooks";
import { updateDates } from "../../../../Redux/slices/selectedDatesSlice";

const DatePicker = ( { selectDatesElement, dateCalenderRatesState }:any ) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", hideOnClickOut, true);
  }, []);

  const refOne = useRef<HTMLDivElement>(null);

  const hideOnClickOut = (e: { target: any }) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const [state, setState] = useState({
    selection1: {
      startDate: localStorage.getItem('checkInDate')!=null? new Date(localStorage.getItem('checkInDate')!) : addDays(new Date(), 0),
      endDate: localStorage.getItem('checkOutDate')!=null?new Date(localStorage.getItem('checkOutDate')!):addDays(new Date(), 2),
      key: "selection1",
    },
  });

  // console.log("dateCalenderRatesState : ", dateCalenderRatesState);

  function customDayContent(day: number | Date) {
    let extraDot = null;
    let price: any = 0;

    dateCalenderRatesState.map((ele : any) => {
      let calenderDate = ele.date.split("T")[0];
      let date = calenderDate.split("-").join("/");
      if(date == format(day, "yyyy/MM/dd")) price = ele.basicNightlyRate;
      // console.log(price);
    })

    
    extraDot = (
      <div
        style={{
          height: "5px",
          width: "5px",
          borderRadius: "100%",
          position: "absolute",
          top: 20,
          color:"green",
        }}
      >
        ${price}
      </div>
    );

    
    return (
      <div>
        <span style={{
          fontWeight:"bold"
        }}>{format(day, "d")}</span>
        {extraDot}
      </div>
    );
  }

  return (
    <div>
      <input
        //ref={selectDatesElement}
        className="form-input"
        id="selectDatesInput"
        type="text"
        name="checkInCheckOutInput"
        placeholder="Check-in -> Check-out"
        onFocus={() => {
          selectDatesElement.current.type = "date";
        }}
        onBlur={() => {
          selectDatesElement.current.type = "text";
        }}
        value={`${format(state.selection1.startDate, "dd/MM/yyyy")} to ${format(
          state.selection1.endDate,
          "dd/MM/yyyy"
        )}`}
        readOnly
        onClick={() => setOpen((open) => !open)}
      />
      {/* <input
        className="form-input"
        id="selectDatesInput"
        type="text"
        name="checkInCheckOutInput"
        value={`${format(state.selection1.startDate, "dd/MM/yyyy")} to ${format(
          state.selection1.endDate,
          "dd/MM/yyyy"
        )}`}
        readOnly
        onClick={() => setOpen((open) => !open)}
      /> */}

      <div ref={refOne} className="date-Range-Picker">
        {open && (
          <DateRangePicker
            onChange={(item) => {
              setState({ ...state, ...item });
              dispatch(updateDates(item.selection1));
            }}
            //showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={[state.selection1]}
            direction="horizontal"
            dayContentRenderer={customDayContent}
            ariaLabels={{
              dateInput: {
                selection1: {
                  startDate: addDays(new Date(), 1),
                  endDate: new Date(),
                },
              },
              monthPicker: "month picker",
              yearPicker: "year picker",
              prevButton: "previous month button",
              nextButton: "next month button",
            }}
            minDate={addDays(new Date(), 0)}
            maxDate={addDays(state.selection1.startDate, 10)}
          />
        )}
      </div>
    </div>
  );
};

export default DatePicker;

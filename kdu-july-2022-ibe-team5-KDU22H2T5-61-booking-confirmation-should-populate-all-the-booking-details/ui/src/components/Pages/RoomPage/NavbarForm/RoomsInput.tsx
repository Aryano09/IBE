import React, { useEffect, useRef, useState } from "react";
import { updateRoomCount } from "../../../../Redux/slices/roomCountSlice";
import { changeSelectedRoomCount } from "../../../../Redux/slices/selectedRoomCountSlice";
import { useAppSelector, useAppDispatch } from "../../../../Redux/hooks";

const RoomsInput = ({roomCountState, tenantConfigurationState}: any) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  // const [selection, setSelection] = useState(1);
  const selection = useAppSelector((state) => state.selectedRoomCountState.value.roomCount);
  const toggle: any = () => setOpen(!open);
  // console.log(roomCountState);

  const num = tenantConfigurationState.roomLimit
  const options: any[] = [];
  for (var i: number = 1; i <= num; i++) {
    options.push(i);
  }

  useEffect(() => {
    const data:any = window.localStorage.getItem('selectedRoomCountState');
    if(data !== null ) dispatch(changeSelectedRoomCount(data));
  },[])


  useEffect(() => {
    document.addEventListener("click", hideOnClickOut, true);
  }, []);

  const refOne = useRef<HTMLDivElement>(null);

  const hideOnClickOut = (e: { target: any }) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div className="roomInput" ref={refOne}>
      <div
        tabIndex={1}
        className="dd-header"
        role="button"
        onClick={() => toggle(!open)}
      >
        <div className="grid grid-cols-2">
          <div>
            <div className="dd-header-title">
              <span>Rooms</span>
            </div>
            <div className="dd-header-title-value">{selection}</div>
          </div>
          <span className="dd-arrow material-symbols-outlined arrow">
            keyboard_arrow_down
          </span>
          {!!open && (
            <div className="dd-list ">
              {options.map((option: number) => (
                <option
                  className="dd-item z-225.9c8"
                  value={option}
                  onClick={(e) =>
                    dispatch(changeSelectedRoomCount(e.currentTarget.value))
                  }
                >
                  {option}
                </option>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomsInput;

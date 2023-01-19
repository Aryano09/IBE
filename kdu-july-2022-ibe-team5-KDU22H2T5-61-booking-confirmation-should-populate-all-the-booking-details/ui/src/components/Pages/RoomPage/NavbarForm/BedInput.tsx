import React, { useEffect, useRef, useState } from "react";
import { updateBedCount } from "../../../../Redux/slices/bedCountSlice";
import roomTypesSlice from "../../../../Redux/slices/roomTypesSlice";
import { useAppSelector, useAppDispatch} from "../../../../Redux/hooks";

const BedInput = ({bedCountState}: any) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  // const [selection, setSelection] = useState(1);
  const selection = useAppSelector((state) => state.bedCountState.value);
  const toggle: any = () => setOpen(!open);

  // console.log(bedCountState )
  // const num = tenantConfigurationState.roomLimit
  const num = 3;
  const options: any[] = [];
  for (var i: number = 1; i <= num; i++) {
    options.push(i);
  }

  useEffect(() => {
    const data:any = window.localStorage.getItem('bedCountState');
    if(data !== null ) dispatch(updateBedCount(JSON.parse(data)));
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
    <div className="bedInput" ref={refOne}>
      <div
        tabIndex={1}
        className="dd-header"
        role="button"
        onClick={() => toggle(!open)}
      >
        <div className="grid grid-cols-2">
          <div>
            <div className="dd-header-title">
              <span>Beds</span>
            </div>
            <div className="dd-header-title-value">{bedCountState.bedCount}</div>
          </div>
          <span className="dd-arrow material-symbols-outlined arrow">
            keyboard_arrow_down
          </span>
          {!!open && (
            <div className="dd-list">
              {options.map((option: number) => (
                <option
                  className="dd-item"
                  value={option}
                  onClick={(e) => {
                    dispatch(updateBedCount(option));
                  }}
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

export default BedInput;
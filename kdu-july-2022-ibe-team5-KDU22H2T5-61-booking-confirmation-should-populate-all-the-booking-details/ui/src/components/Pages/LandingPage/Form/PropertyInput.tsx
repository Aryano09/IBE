import React from "react";
import { changeProperty } from "../../../../Redux/slices/selectedPropertySlice";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";

const PropertyInput = ({ propertyOptions }: any) => {
  const dispatch = useAppDispatch();
  const textsState = useAppSelector((state) => state.textsState.value);
  return (
    <select
      id="propertyInput"
      name="propertyInput"
      placeholder="Search all Properties"
      required
      className="form-select grid justify-start"
      onChange={(e) => dispatch(changeProperty(propertyOptions[e.target.selectedIndex]))}
    >
      {/* <option
        className="propertyInputPlaceholder"
        value=""
        disabled
        selected
        hidden
      >
        {textsState.propertySearchLabel}
      </option> */}
      {propertyOptions.map((property: any, index: any): any => {
        return (
          <option value={property}>
            {property.propertyName}
          </option>
        );
      })}
    </select>
  );
};

export default PropertyInput;

import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createGuest } from "../../../Redux/slices/BookingSlices/guestSlice";
import {
  updateShowBillingInfo,
  updateShowTravellerInfo,
} from "../../../Redux/slices/BookingSlices/renderSlice";
import { useAppSelector, useAppDispatch } from "../../../Redux/hooks";
import 'react-phone-number-input/style.css'
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form'

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.number().integer("Enter numbers").required(),
  email: yup.string().email("Not a proper email").required(),
});

type Inputs = {
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
};

const TravellerInfoForm = () => {
  // const [value, setValue] = useState()

  const { control } = useForm()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.userState.value);
  const submitForm = async (data: any) => {
    console.log("traveller info : ", data);
    dispatch(createGuest(data));
    dispatch(updateShowTravellerInfo(false));
    dispatch(updateShowBillingInfo(true));

    // let params = {
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   phone: data.phone,
    //   email: data.email,
    // };

    // let res = await axios.post(
    //   "http://ibe-t5-alb-181387793.eu-west-3.elb.amazonaws.com/api/guest",
    //   params
    // );
    // console.log(res.data);
  };

  return (
    <div className="grid travellerForm">
      <div className="Form-title">
        <span>Traveller Info</span>
      </div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="grid grid-cols-2">
          <div>
            <label id="inputLabel">
              <span>First Name</span>
            </label>
            <input className="inputBox" {...register("firstName")} />
            <p>{errors.firstName?.message}</p>
          </div>
          <div>
            <label id="inputLabel">
              <span>Last Name</span>
            </label>
            <input className="inputBox" {...register("lastName")} />
            <p>{errors.lastName?.message}</p>
          </div>
        </div>

        <label id="inputLabel">
          <span>Phone</span>
        </label>
        <PhoneInputWithCountry className="inputBox" control={control} rules={{ required: true }} {...register("phone")}  />
        {/* <input className="inputBox" {...register("phone")} maxLength={10} /> */}
        {errors.phone?.type === "required" && (
          <p>phone number is required and must be 10 of digits</p>
        )}

        <div className="grid grid-cols-2">
          <div>
            <label id="inputLabel">
              <span>Email</span>
            </label>
            {sessionStorage.getItem("loggedInUsername") !== null ? (
              <input
                className="inputBox"
                {...register("email")}
                readOnly
                // value={localStorage.getItem("loggedInUsername") + ""}
                value={sessionStorage.getItem("loggedInUsername") + ""}
              />
            ) : (
              <input className="inputBox" {...register("email")} />
            )}
            <p>{errors.email?.message}</p>
          </div>
          <div>
            <input type="submit" id="submitBtn" value={"Next"} className="cursor-pointer"/>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TravellerInfoForm;

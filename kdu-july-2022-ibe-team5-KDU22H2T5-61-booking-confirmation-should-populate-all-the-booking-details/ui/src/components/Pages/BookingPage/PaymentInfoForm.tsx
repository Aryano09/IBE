import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import axios from "axios";
import { response } from "express";
import { setGuestId } from "../../../Redux/slices/BookingSlices/billingInfoSlice";
import {
  updateShowBillingInfo,
  updateShowPaymentInfo,
} from "../../../Redux/slices/BookingSlices/renderSlice";
import emailjs from "@emailjs/browser";
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useRef, useState } from "react";
// import TandC from "./TandC";
import Checkbox from "./Checkbox";
import { setErrorMessage } from "../../../Redux/slices/errorMessageSlice";
import validator from 'validator';
import { setBookingLoader } from "../../../Redux/slices/progressLoadersSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";


const schema = yup.object({
  cardNumber: yup.string().required().test('cardValidation','This card is not valid', (val:any) => validator.isCreditCard(val)),
  expiryMM: yup.string().required().test('expiryMonthValidation','Enter a valid value', (val:any) => val<13 && val>0),
  expiryYY: yup.string().required().test('expiryYearValidation','Enter a valid value', (val:any) => val<30 && val>21),
  cvv: yup.string().required().test('cvvValidation','Enter a valid value', (val:any) => val<1000 && val>99),
});

type Inputs = {
  cardNumber: string;
  expiryMM: string;
  expiryYY: string;
  cvv: number;
};

const PaymentInfoForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });
  const dispatch = useAppDispatch();
  const billState = useAppSelector((state) => state.billState.value);
  const guestState = useAppSelector((state) => state.guestState.value);
  const billingInfoState = useAppSelector(
    (state) => state.billingInfoState.value
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));
  const progressLoadersState = useAppSelector((state) => state.progressLoadersState.value);

  const submitForm = async (data: any) => {
    purchaseButton.current.disabled = true;
    purchaseButton.current.style.backgroundColor = "grey";
    dispatch(setBookingLoader(true));
    let roomTypeJSON: any = localStorage.getItem("roomType");
    let roomType: any = JSON.parse(roomTypeJSON);

    console.log(validator.isCreditCard(data.cardNumber))


    let promotionJSON: any = localStorage.getItem("promotion");
    let promotion: any = JSON.parse(promotionJSON);

    let guestDTO: any = {
      firstName: guestState.firstName,
      lastName: guestState.lastName,
      phone: guestState.phone,
      email: guestState.email,
    };

    let billingInfoDTO: any = {
      city: billingInfoState.city,
      country: billingInfoState.country,
      email: billingInfoState.email,
      firstName: billingInfoState.firstName,
      lastName: billingInfoState.lastName,
      mailingAddress1: billingInfoState.mailingAddress1,
      mailingAddress2: billingInfoState.mailingAddress2,
      phone: billingInfoState.phone,
      state: billingInfoState.state,
      zip: billingInfoState.zip,
    };

    let params: any = {
      propertyId: Number(localStorage.getItem("propertyId")),
      roomTypeId: Number(roomType.roomTypeId),
      roomCount: Number(localStorage.getItem("selectedRoomCountState")),
      checkInDate: localStorage.getItem("checkInDate"),
      checkOutDate: localStorage.getItem("checkOutDate"),
      adultCount: Number(
        Number(localStorage.getItem("adultsCount")) +
          Number(localStorage.getItem("teensCount"))
      ),
      amountDueAtResort: billState.dueAtResort,
      childCount: Number(localStorage.getItem("kidsCount")),
      guestId: null,
      promotionId: Number(promotion.promotionId),
      statusId: 1,
      totalCost: billState.totalAmount,
      billingInfoId: null,
      pricePerRoom: billState.pricePerRoomOnCheckInDate,
      duration: billState.duration,
      subtotal: billState.subtotal,
      dueNow: billState.dueNow,
      occupancyTax: billState.occupancyTax,
      totalResortFee: billState.totalResortFee,
      taxSurchargeFeeTotal: billState.taxSurchargFeeTotal,
      guestDTO: guestDTO,
      billingInfoDTO: billingInfoDTO,
      roomTypeName: roomType.name,
      paymentCardNumber: data.cardNumber,
    };
    let res = await axios.post(
      // "http://ibe-t5-alb-181387793.eu-west-3.elb.amazonaws.com/api/booking",
      `${process.env.REACT_APP_API_GATEWAY_BASE_URL}/booking`,
      // "http://localhost:8080/api/booking",
      params,
      {headers:{"x-api-key": process.env.REACT_APP_API_GATEWAY_API_KEY ?? ``}}
    );
    let bookingId = res.data[0];
    let decryptedBookingId = res.data[1];
    if(bookingId === "-1"){
      dispatch(setBookingLoader(false));
      dispatch(setErrorMessage("No rooms are available"));
      navigate("/Error");
      return;
    }
    console.log(`Booking successful with id: ${bookingId}`);

    const templateParams: any = {
      booking_id: decryptedBookingId,
      guest_first_name: guestDTO.firstName,
      guest_last_name: guestDTO.lastName,
      url: bookingId,
      room_type_name: roomType.name,
      check_in_date: params.checkInDate,
      check_out_date: params.checkOutDate,
      nightly_rate: billState.pricePerRoomOnCheckInDate,
      room_count: params.roomCount,
      subtotal: params.subtotal,
      tax: params.taxSurchargeFeeTotal,
      due_at_resort: params.amountDueAtResort,
      total_cost: params.totalCost,
      guest_email: guestDTO.email,
    };

    const {
      REACT_APP_SERVICE_ID,
      REACT_APP_TEMPLATE_ID,
      REACT_APP_API_KEY,
    }: any = process.env;
    axios.post(
      // "http://ibe-t5-alb-181387793.eu-west-3.elb.amazonaws.com/api/booking/email/",
      `${process.env.REACT_APP_API_GATEWAY_BASE_URL}/booking/email`,
      templateParams,
      {headers:{"x-api-key": process.env.REACT_APP_API_GATEWAY_API_KEY ?? ``}}
    );

    let newQuery = `?bookingId=${bookingId}`;
    setSearchParams({
      query: newQuery,
    });

    console.log(searchParams.get("query"));

    dispatch(setBookingLoader(false));
    navigate({
      pathname: "Confirmation",
      search: `?${createSearchParams({
        BookingId: bookingId,
      })}`,
    });

    // emailjs
    //   .send(
    //     REACT_APP_SERVICE_ID,
    //     REACT_APP_TEMPLATE_ID,
    //     templateParams,
    //     REACT_APP_API_KEY
    //   )
    //   .then(
    //     (result) => {
    //       console.log("SUCCESS!", result.status, result.text);
    //     },
    //     (error) => {
    //       console.log("FAILED...", error);
    //     }
    //   );
  };

  const ref = useRef();

  const [isCheckedA, setIsCheckedA] = useState(false);
  const handleChangeA = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedA(e.target.checked);
  };

  const [isCheckedB, setIsCheckedB] = useState(false);
  const handleChangeB = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`checkedB: `,e.target.checked);
    
    setIsCheckedB(e.target.checked);
  };

  const handlePrev = () => {
    dispatch(updateShowBillingInfo(true));
    dispatch(updateShowPaymentInfo(false));
  };

  const purchaseButtonHandler = (e: any) => {
    // console.log(isCheckedB);
    
    if (isCheckedB == false) {
      alert('Please check and agree to terms and conditions.');
      e.preventDefault();
      return;
    }
    console.log(`clicked`);
    console.log(`pass`);
  };

  const purchaseButton = useRef<any>(null);

  return (
    <div className="grid paymentForm">
      {progressLoadersState.bookingLoader == true ? (<div className="progress absolute top-1/2 left-1/2 z-20">
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            </div>) : null}
      <div className="Form-title">
        <span>Payment Info</span>
      </div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="grid grid-cols-2">
          <div>
            <label id="inputLabel">
              <span>Card Number</span>
            </label>
            <input className="inputBox" {...register("cardNumber")} />
            <p>{errors.cardNumber?.message}</p>
          </div>
          <div>
            <div className="grid grid-cols-2">
              <div>
                <label id="inputLabel">
                  <span>Expiry MM</span>
                </label>
                <input className="expiryInputBox" {...register("expiryMM")} />
                <p>{errors.expiryMM?.message}</p>
              </div>
              <div>
                <label id="inputLabel">
                  <span>Expiry YY</span>
                </label>
                <input className="expiryInputBox" {...register("expiryYY")} />
                <p>{errors.expiryYY?.message}</p>
              </div>
            </div>
          </div>
        </div>

        <label id="inputLabel">
          <span>CVV</span>
        </label>
        <input
          className="inputBox"
          {...register("cvv")}
          type="password"
          maxLength={3}
          minLength={3}
        />
        <p>{errors.cvv?.message}</p>

        <div className="grid grid-cols-2">
          <div>
            <button id="prevBtn" onClick={handlePrev}>
              Previous
            </button>
          </div>
          {
            <div>
              <input
                ref={purchaseButton}
                type="submit"
                id="submitBtn"
                value={"Purchase"}
                onClick={purchaseButtonHandler}
                className="cursor-pointer"
              />
            </div>
          }
        </div>
      </form>
      {/* <TandC /> */}

      <div className="tcCheckbox">
        <div style={{ display: "inline" }} onChange={handleChangeA}>
          <Checkbox
            isChecked={isCheckedA}
            label={"Send me special offers."}
          />
        </div>
        <div onChange={handleChangeB}>
          <Checkbox
            isChecked={isCheckedB}
            label={"I agree to the Terms and Policies of travel."}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoForm;

import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Country, State, City }  from 'country-state-city';
import { useDispatch } from 'react-redux';
import { createBilllingInfo } from '../../../Redux/slices/BookingSlices/billingInfoSlice';
import { updateShowBillingInfo, updateShowPaymentInfo, updateShowTravellerInfo } from '../../../Redux/slices/BookingSlices/renderSlice';
import { useAppSelector } from '../../../Redux/hooks';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form'

// console.log(Country.getAllCountries())
// console.log(State.getAllStates())


const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  mailingAddress1:yup.string().required(),
  mailingAddress2:yup.string().required(),
  country:yup.string().required(),
  city:yup.string().required(),
  state:yup.string(),
  zip:yup.string().required().test('zipValidation','Enter a valid value', (val:any) => val<=999999 && val>=999),
  phone: yup.number().integer().positive().required(),
  email: yup.string().email('Not a proper email').required(),
})

type Inputs = {
  firstName: string,
  lastName: string,
  mailingAddress1:string,
  mailingAddress2:string,
  country:string,
  city:string,
  state:string,
  zip:number,
  phone: number,
  email:string,
};

const BillingInfoForm = () => {
  const { control } = useForm()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({ resolver: yupResolver(schema)});
  const dispatch = useDispatch();
  const submitForm = (data : any) => {
    console.log("billing info : ", data);
    dispatch(createBilllingInfo(data));
    dispatch(updateShowBillingInfo(false));
    dispatch(updateShowPaymentInfo(true));
  }

  const handlePrev = () => {
    dispatch(updateShowBillingInfo(false));
    dispatch(updateShowTravellerInfo(true));
  }

  const [countryCode,setCountryCode] = useState<any>();
  const code = (countryName: any) => {
    const TempCountryCode = Country.getAllCountries().filter(e => 
      e.name == countryName
    )
    setCountryCode(TempCountryCode[0].isoCode) ;

    console.log(State.getStatesOfCountry(countryCode));
  }

  return (
    <div className='grid billingForm'>
      <div className='Form-title'><span>Billing Info</span></div>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className='grid grid-cols-2'>
            <div>
              <label id='inputLabel' ><span>First Name</span></label>
              <input className='inputBox'{...register("firstName")}  />
              <p>{errors.firstName?.message}</p>
            </div>
            <div>
              <label id='inputLabel' ><span>Last Name</span></label>
              <input className='inputBox'{...register("lastName")}  />
              <p>{errors.lastName?.message}</p>
            </div>
          </div>

          <div className='grid grid-cols-2'>
            <div>
              <label id='inputLabel' ><span>Mailing Address 1</span></label>
              <input className='inputBox'{...register("mailingAddress1")}  />
              <p>{errors.mailingAddress1?.message}</p>
            </div>
            <div>
              <label id='inputLabel' ><span>Mailing Address 2</span></label>
              <input className='inputBox'{...register("mailingAddress2")}  />
              <p>{errors.mailingAddress2?.message}</p>
            </div>
          </div>

          <label id='inputLabel' ><span>Country</span></label>
          {/* <input className='inputBox'{...register("country")}  /> */}
          <select className='inputBox' {...register("country")}  onChange={(event)=>{code(event.target.value)}}>
            {Country.getAllCountries().map(e => {

              return (
                <option>{e.name}</option>
              );
            })}
          </select>
          <p>{errors.country?.message}</p>

          <div className='grid grid-cols-2'>
            <div>
              <label id='inputLabel' ><span>City</span></label>
              <input className='inputBox'{...register("city")}  />
              <p>{errors.city?.message}</p>
            </div>
            <div>
              <div className='grid grid-cols-2'>
                <div>
                  <label id='inputLabel' ><span>State</span></label>
                  {/* <input className='stateInputBox'{...register("state")}  /> */}
                  <select className='stateInputBox' {...register("state")}>
                    {State.getStatesOfCountry(countryCode).map(e => {
                      return (
                        <option>{e.name}</option>
                      );
                    })}
                  </select>
                  <p>{errors.state?.message}</p>
                </div>
                <div>
                  <label id='inputLabel' ><span>Zip</span></label>
                  <input className='zipInputBox'{...register("zip")}/>
                  <p>{errors.zip?.message}</p>
                </div>
              </div>
            </div>
          </div>

          <label id='inputLabel' ><span>Phone</span></label>
          <PhoneInputWithCountry className="inputBox" control={control} rules={{ required: true }} {...register("phone")}  />
          {/* <input className='inputBox'{...register("phone")}  maxLength={10}/> */}
          <p>{errors.phone?.message}</p>

          <div className='grid grid-cols-2'>
            <div>
              <label id='inputLabel' ><span>Email</span></label>
              <input className='inputBox'{...register("email")}  />
              <p>{errors.email?.message}</p>
            </div>
            <div className='grid grid-cols-2'>
              <div>
                <button className='cursor-pointer' id='prevBtn' onClick={handlePrev}>Previous</button>
              </div>
              <div>
                <input className='cursor-pointer' type="submit" id='submitBtn' value={"Next"}/>
              </div>
            </div>
          </div>
        </form>
    </div>
  )
}

export default BillingInfoForm
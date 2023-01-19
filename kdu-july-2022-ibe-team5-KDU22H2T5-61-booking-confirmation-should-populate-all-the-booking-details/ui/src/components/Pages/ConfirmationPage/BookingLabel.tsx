import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { fetchConfirmationInfoState } from '../../../Redux/slices/ConfirmationSlices/ConfirmationInfo';

const BookingLabel = ({ printButtonHandler, sendEmail }: any) => {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const bookingId = searchParams.get("BookingId");

  useEffect(()=>{
    dispatch(fetchConfirmationInfoState(bookingId));
  },[]);

  const confirmationInfoState = useAppSelector((state)=> state.confirmationInfoState.value);
  return (
    <div className="grid grid-cols-2 Label">
      <div className="bookingLabel">Upcoming reservation #{confirmationInfoState.bookingId} <span className='text-red-500'>{confirmationInfoState.bookingStatusDTO.status==="CANCELLED" && `(CANCELLED)`}</span></div>
      <div className="grid grid-cols-2">
        <div className="printBtn cursor-pointer hover:bg-slate-200" onClick={printButtonHandler}>
          Print
        </div>
        <div className="printBtn cursor-pointer hover:bg-slate-200" onClick={sendEmail}>Email</div>
      </div>
    </div>
  );
};

export default BookingLabel;

import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { fetchConfirmationInfoState } from '../../../Redux/slices/ConfirmationSlices/ConfirmationInfo';

const BookingLabel = ({ printButtonHandler }: any) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const bookingId = searchParams.get("BookingId");

  useEffect(()=>{
    dispatch(fetchConfirmationInfoState(bookingId));
  },[]);

  const confirmationInfoState = useAppSelector((state)=> state.confirmationInfoState.value);
  return (
    <div className="grid grid-cols-2 Label">
      <div className="bookingLabel">Upcoming reservation #{confirmationInfoState.bookingId}</div>
      <div className="grid grid-cols-2">
        <div className="printBtn" onClick={printButtonHandler}>
          Print
        </div>
        <div className="printBtn">Email</div>
      </div>
    </div>
  );
};

export default BookingLabel;

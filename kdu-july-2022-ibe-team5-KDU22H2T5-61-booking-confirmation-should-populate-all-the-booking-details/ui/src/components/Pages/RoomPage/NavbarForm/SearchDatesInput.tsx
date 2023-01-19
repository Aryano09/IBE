import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../../Redux/hooks'
import { fetchRoomTypes } from '../../../../Redux/slices/roomTypesSlice'
import { fetchPromotions } from '../../../../Redux/slices/promotionsSlice'

const SearchDatesInput = () => {
  const[searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query'));

  const dispatch = useAppDispatch();

  let selectedPropertyState = useAppSelector((state) => state.selectedPropertyState.value);
  let selectedDatesState = useAppSelector((state) => state.selectedDatesState.value);
  let guestCountState = useAppSelector((state) => state.guestCountState.value);
  let bedCountState = useAppSelector((state) => state.bedCountState.value);
  let selectedRoomCountState = useAppSelector((state) => state.selectedRoomCountState.value);

  const urlGenerator = () => {
    let propertyId = localStorage.getItem('propertyId');
    let checkInDate = localStorage.getItem('checkInDate');
    let checkOutDate = localStorage.getItem('checkOutDate');
    let totalGuests = localStorage.getItem('totalGuests');
    let totalBeds = localStorage.getItem('bedCountState');
    let totalRooms = localStorage.getItem('selectedRoomCountState');
    let newQuery = `?property/${propertyId}/search/rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guests=${totalGuests}&beds=${totalBeds}&rooms=${totalRooms}`;
    setQuery(newQuery);
    setSearchParams({
      query: newQuery
    })
    //console.log(searchParams.get('query'));
  }

  const searchDatesClickHandler = async () => {
    let propertyId = localStorage.getItem('propertyId') != null ? localStorage.getItem('propertyId') : selectedPropertyState.id;
    let checkInDate = localStorage.getItem('checkInDate') != null ? localStorage.getItem('checkInDate') : selectedDatesState.checkInDate.toISOString().split('T')[0] + 'T00:00:00.000Z';
    let checkOutDate = localStorage.getItem('checkOutDate') != null ? localStorage.getItem('checkOutDate') : selectedDatesState.checkOutDate.toISOString().split('T')[0] + 'T00:00:00.000Z';
    let totalGuests = localStorage.getItem('totalGuests') != null ? localStorage.getItem('totalGuests') : guestCountState.adultsCount + guestCountState.teensCount + guestCountState.kidsCount;
    let totalBeds = localStorage.getItem('bedCountState') != null ? localStorage.getItem('bedCountState'): bedCountState.bedCount;
    let totalRooms = localStorage.getItem('selectedRoomCountState') != null ? localStorage.getItem('selectedRoomCountState') : selectedRoomCountState;
    urlGenerator();
    let roomTypesObj = {propertyId, checkInDate, checkOutDate, totalGuests, totalBeds, totalRooms};
    dispatch(fetchRoomTypes(roomTypesObj));
    let promotionsObj = {checkInDate, checkOutDate};
    dispatch(fetchPromotions(promotionsObj))
  }

  return (
    <div className='searchDates' onClick={() => searchDatesClickHandler()}  >
      <button onClick={(e) => e.preventDefault()}>SEARCH DATES</button>
    </div>
  )
}

export default SearchDatesInput

// property/${propertyId}/search/rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guests=${totalGuests}&beds=${totalBeds}&rooms=${totalRooms}
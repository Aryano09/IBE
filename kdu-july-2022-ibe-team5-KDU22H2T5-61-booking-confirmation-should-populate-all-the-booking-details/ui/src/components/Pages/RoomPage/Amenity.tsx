import React from 'react'
import amenityTickIcon from '../../../assets/roomModal/AmenitiesTickIcon.svg';

const Amenity = ({amenity, index}: any) => {
  return (
    <div className="amenity grid">
        <div className="amenityTickIcon grid">
            <img src={amenityTickIcon} alt=''/>
        </div>
        <div className="amenityTitle">
            {amenity}
        </div>
    </div>
  )
}

export default Amenity
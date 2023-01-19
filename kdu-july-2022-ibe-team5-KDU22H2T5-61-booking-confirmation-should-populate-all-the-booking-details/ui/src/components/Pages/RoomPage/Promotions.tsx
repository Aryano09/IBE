import React from "react";
import Deal from "./Deal";

const Promotions = ({ promotions, roomType }: any) => {
  return (
    <div className="promotions grid">
      <div className="heading grid">Standard Rates</div>
      <div className="deals grid">
        {promotions.map((promotion:any) => <Deal promotion={promotion} roomType={roomType} />)}
      </div>
    </div>
  );
};

export default Promotions;

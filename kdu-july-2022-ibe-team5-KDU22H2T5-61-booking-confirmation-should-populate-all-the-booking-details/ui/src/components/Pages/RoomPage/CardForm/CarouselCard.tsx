import React from "react";
//import Image from "../../../assets/test.jpeg"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CarouselCard = ({ imageUrls }: any) => {
  return (
    <Carousel showArrows={true}>
      {imageUrls.map((imageUrl: any) => {
        return (
          <div>
            <img src={imageUrl.slice(4, -1)} alt="" />
          </div>
        );
      })}
    </Carousel>
  );
};

export default CarouselCard;

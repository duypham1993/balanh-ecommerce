import { useState } from "react";
import Slider from "react-slick";
import "./carousel-img.scss";

const CarouselImg = ({ arrImg }) => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  return (
    <div className="custom-carousel">
      <Slider
        asNavFor={nav2}
        ref={(slider1) => setNav1(slider1)}
      >
        {arrImg?.map((img, index) => {
          return (
            <div className="custom-carousel__wrapper-img" key={index}>
              <img src={img} className="custom-carousel__img" />
            </div>
          )
        })}
      </Slider>
      <Slider
        asNavFor={nav1}
        ref={(slider2) => setNav2(slider2)}
        slidesToShow={arrImg?.length > 6 ? 6 : arrImg?.length}
        swipeToSlide={true}
        focusOnSelect={true}
        className="custom-carousel__indicator d-none d-md-block"
      >
        {arrImg?.map((img, index) => {
          return (
            <div key={index} className="custom-carousel__indicator-wrapper">
              <img src={img} className="custom-carousel__indicator-img" />
            </div>
          )
        })}
      </Slider>
    </div>
  );
}

export default CarouselImg;
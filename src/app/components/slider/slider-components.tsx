// components/CustomSwiper.js
import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import SwiperCore from 'swiper/core';
import Pagination from "swiper/core"
import Navigation from "swiper/core"
import  { Autoplay }  from "swiper/core"

SwiperCore.use([Navigation, Pagination, Autoplay]);
const SliderManual = () =>{
 
    return(
        <>
        <Swiper
        //   ref={swiperRef}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        spaceBetween={30}
        slidesPerView={2}
      >
        <SwiperSlide>
          <div className="slide-content">Slide 1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-content">Slide 2</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-content">Slide 3</div>
        </SwiperSlide>
      </Swiper>
        </>
    )
}
export default SliderManual
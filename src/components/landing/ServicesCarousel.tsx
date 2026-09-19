import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { carouselServices } from '@/assets/data'

export default function ServicesCarousel() {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={12}
      slidesPerView="auto"
      centeredSlides={false}
      pagination={{ clickable: true }}
      navigation={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="w-full h-[200px]"
    >
      {carouselServices.map(({ text, image }, index) => (
        <SwiperSlide key={index} className="!w-[120px] ">
          <figure
            key={index}
            className={` relative h-[150px] bg-gray-300 overflow-hidden ${
              index % 2 !== 0 && 'translate-y-12'
            }  rounded-2xl`}
          >
            <img
              src={image}
              alt={text}
              className="w-full h-full object-cover object-center"
            />
            <figcaption className="text-[10px] bg-white rounded-md absolute bottom-2 w-[90%] left-1/2 -translate-x-1/2 text-center py-1.5 capitalize">
              {text}
            </figcaption>
          </figure>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

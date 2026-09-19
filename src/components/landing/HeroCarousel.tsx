import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { heroCarousel } from '@/assets/data'

export default function HeroCarousel() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      centeredSlides={true}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className="w-full h-auto rounded-2xl mt-6"
    >
      {heroCarousel.map((img, index) => (
        <SwiperSlide key={index} className="w-full h-full ">
          <figure
            key={index}
            className={`relative w-full h-full overflow-hidden rounded-2xl`}
          >
            <img
              src={img}
              alt={img}
              className="w-full h-full aspect-6/3 object-cover object-top "
            />
          </figure>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

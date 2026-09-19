import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'

interface CategoriesCarouselProp {
  images: string[] | undefined
}

function ImageCarousel({ images }: CategoriesCarouselProp) {
  return (
    <div className="relative">
      <Carousel
        opts={{
          align: 'end',
        }}
        className="w-full h-max px-6  -my-4"
      >
        <CarouselContent className="pl-2">
          {images?.map((image, index) => (
            <CarouselItem
              key={index}
              className={`${images.length > 1 ? 'basis-1/2' : 'basis-1/1'} ${images.length > 2 ? 'sm:basis-1/3' : 'sm:basis-1/2'} ${images.length > 3 ? 'xl:basis-1/4' : 'xl:basis-1/3'} pl-2`}
            >
              <img
                src={image}
                alt={`offer-image-${index}`}
                className="w-full aspect-4/3 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          size="lg"
          className={`-left-2 cursor-pointer bg-transparent hover:bg-transparent hover:text-primary border-0 shadow-none  `}
        />
        <CarouselNext
          variant="ghost"
          className={`-right-2 cursor-pointer bg-transparent hover:bg-transparent hover:text-primary border-0 shadow-none`}
        />
      </Carousel>
    </div>
  )
}
export default ImageCarousel

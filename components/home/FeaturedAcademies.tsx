import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export const FeaturedAcademies = () => {
  return (
    <section className="relative flex justify-center top-20 bg-slate-100 px-5 md:px-24 dark:bg-slate-900 py-20">
      <div>
        <h2 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Algunas de las academias mas destacadas son:
        </h2>
        <div className="flex justify-center mt-4">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl"
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-8">
                        <span className="text-3xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  )
}

export default FeaturedAcademies

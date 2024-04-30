'use client';
import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { AboutCarouselConfig } from '@/types';

export function AboutCarousel({ slides }: { slides: AboutCarouselConfig[] }) {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.start}
      className="w-full max-w-xs md:max-w-7xl"
      opts={{ align: 'start', loop: true }}
    >
      <CarouselContent>
        {slides.map((item, index) => (
          <CarouselItem key={index} className="pl-5 md:basis-1/2 lg:basis-1/3">
            <Card className="h-full items-center">
              {item.imagePath && (
                <Image
                  src={item.imagePath}
                  alt={item.title}
                  width={150}
                  height={150}
                  className="dark:bg-primary-foreground w-1/2 mx-auto mt-5 rounded-full"
                />
              )}
              <CardHeader className="text-center">
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.content}</CardDescription>
              </CardHeader>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}

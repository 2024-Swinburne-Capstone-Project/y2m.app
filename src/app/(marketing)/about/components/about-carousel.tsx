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
      onMouseEnter={() => plugin.current.stop()}
      onMouseLeave={() => plugin.current.play()}
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
                  alt={item.title.text}
                  width={150}
                  height={150}
                  className="mx-auto mt-5 w-1/2 rounded-full dark:bg-foreground"
                />
              )}
              <CardHeader className="text-center">
                <CardTitle>{item.title.text}</CardTitle>
                <CardDescription>{item.content.text}</CardDescription>
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

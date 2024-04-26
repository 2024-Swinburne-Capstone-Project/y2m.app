'use client';
import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
      className="w-full mx-10"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.start}
      opts={{ align: 'start', loop: true }}
    >
      <CarouselContent>
        {slides.map((item, index) => (
          <CarouselItem key={index} className="pl-5 md:basis-1/2 lg:basis-1/3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.content}</CardDescription>
              </CardHeader>
              {item.imagePath && (
                <CardContent className="h-80 overflow-hidden">
                  <Image
                    src={item.imagePath}
                    alt={item.title}
                    width={1280}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </CardContent>
              )}
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

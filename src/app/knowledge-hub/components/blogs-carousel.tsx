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
import { BlogsConfig } from '@/types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import BlogPage from './blog';

interface BlogsCarouselProps {
  slides: BlogsConfig[];
}

export function BlogsCarousel({ slides }: BlogsCarouselProps) {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));
  const [selectedBlog, setSelectedBlog] = useState<BlogsConfig | undefined>(undefined);

  if (selectedBlog) {
    return (
      <div>
        <BlogPage blog={selectedBlog} />
        <Button className="my-5" onClick={() => setSelectedBlog(undefined)}>
          Back
        </Button>
      </div>
    );
  }

  return (
    <Carousel
      plugins={[plugin.current]}
      className="mx-10 max-w-xs md:max-w-7xl"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.start}
      opts={{ align: 'start', loop: true }}
    >
      <CarouselContent>
        {slides.map((item, index) => (
          <CarouselItem
            key={index}
            className="pl-5 md:basis-1/2 lg:basis-1/3"
            onClick={() => setSelectedBlog(item)}
          >
            <Card className="h-full cursor-pointer">
              <CardHeader className="flex flex-col items-center">
                <Image
                  src={item.imagePath}
                  alt={item.title}
                  width={1280}
                  height={300}
                  className="h-60 object-cover"
                />
                <CardDescription className="mt-4 text-center">
                  {item.date.toDateString()}
                </CardDescription>
                <CardTitle className="mt-2 text-center">{item.title}</CardTitle>
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

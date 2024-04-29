'use client';
import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { BlogsConfig } from '@/types';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import BlogPage from './blog';

interface BlogsCarouselProps {
  slides: BlogsConfig[];
}

export function BlogsCarousel({ slides }: BlogsCarouselProps) {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));
  const [selectedBlog, setSelectedBlog] = useState<BlogsConfig | undefined>(undefined);

  useEffect(() => {
    if (selectedBlog) {
      window.scrollTo(0, 0);
    }
  }, [selectedBlog]);

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
      className="max-w-xs md:max-w-7xl mx-10"
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
                <Image src={item.imagePath} alt={item.title} width={1280} height={300} className="object-cover h-60" />
                <CardDescription className="text-center mt-4">{item.date.toDateString()}</CardDescription>
                <CardTitle className="text-center mt-2">{item.title}</CardTitle>
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
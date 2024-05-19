'use client';
import { useEffect, useState } from 'react';
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
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export function BlogsCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));

  const [slides, setSlides] = useState<BlogsConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blogs', { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        const formattedData = data.map((blog: BlogsConfig) => ({
          id: blog.id,
          title: {
            text: blog.title,
          },
          content: {
            text: blog.content,
          },
          date: new Date(blog.date),
          author: {
            text: blog.author,
          },
          imagePath: blog.imagePath,
        }));
        setSlides(formattedData);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (isLoading || !slides) {
    return (
      <div className="flex items-center justify-center ">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Carousel
      plugins={[plugin.current]}
      className="max-w-xs md:max-w-7xl"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.start}
      opts={{ align: 'start', loop: true }}
    >
      <CarouselContent>
        {slides.map((item, index) => (
          <CarouselItem key={index} className="pl-5 md:basis-1/2 lg:basis-1/3">
            <Link href={`/knowledge-hub/blogs/blog?id=${item.id}`}>
              <Card className="h-full cursor-pointer">
                <CardHeader className="flex flex-col items-center">
                  <Image
                    src={item.imagePath}
                    alt={item.title.text}
                    width={1280}
                    height={300}
                    className="h-60 object-cover"
                  />
                  <CardDescription className="mt-4 text-center">
                    {item.date.toDateString()}
                  </CardDescription>
                  <CardTitle className="mt-2 text-center">{item.title.text}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}

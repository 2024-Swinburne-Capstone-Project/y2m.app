'use client';
import * as React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { ErrorAlert } from '@/components/common/error-alert';
import { LoadingSkeleton } from '@/components/common/loading-skeleton';

interface BlogsCarouselProps {
  blogs: BlogPost[];
  isLoading: boolean;
  error: Error | null;
}

const BlogCard: React.FC<{ blog: BlogPost }> = ({ blog }) => (
  <Link href={`/knowledge-hub/blogs/blog?id=${blog.id}`}>
    <Card className="h-full cursor-pointer">
      <CardHeader>
        <Image
          src={blog.imagePath}
          alt={blog.title}
          width={1280}
          height={300}
          className="h-48 w-full object-cover"
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          {new Date(blog.date.toString()).toDateString()}
        </p>
      </CardFooter>
    </Card>
  </Link>
);

export function BlogsCarousel({ blogs, isLoading, error }: BlogsCarouselProps) {
  if (isLoading) {
    return <LoadingSkeleton count={3} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" />;
  }

  if (error) {
    return <ErrorAlert message="Failed to load blog posts. Please try again later." />;
  }

  if (!blogs || blogs.length === 0) {
    return <ErrorAlert message="No blog posts are available at the moment." />;
  }

  return (
    <Carousel className="max-w-xs md:max-w-7xl">
      <CarouselContent>
        {blogs.map((blog) => (
          <CarouselItem key={blog.id.toString()} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <BlogCard blog={blog} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

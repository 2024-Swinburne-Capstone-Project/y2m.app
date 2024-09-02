'use client';
import * as React from 'react';
import MainSection from '@/components/common/main-section';
import MainSectionBody from '@/components/common/main-section-body';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { MediaRelease } from '@/types/db';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { LoadingSkeleton } from '@/components/common/loading-skeleton';
import { ErrorAlert } from '@/components/common/error-alert';

export function MediaCarousel({
  error,
  isLoading,
  mediaReleases,
}: {
  error: Error | null;
  isLoading: boolean;
  mediaReleases: MediaRelease[] | undefined;
}) {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));

  if (isLoading) {
    return <LoadingSkeleton count={3} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" />;
  }

  if (error) {
    return <ErrorAlert message="Failed to load media releases. Please try again later." />;
  }

  if (!mediaReleases || mediaReleases.length === 0) {
    return <ErrorAlert message="No media releases are available at the moment." />;
  }

  return (
    <MainSection>
      <MainSectionBody>
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={() => plugin.current.stop()}
          onMouseLeave={() => plugin.current.play()}
          className="w-full max-w-xs md:max-w-7xl"
          opts={{ align: 'start', loop: true }}
        >
          <CarouselContent>
            {mediaReleases.map((item, index) => (
              <CarouselItem key={index} className="pl-5 md:basis-1/2 lg:basis-1/3">
                <Link href={item.href} target="_blank">
                  <Card className="h-full cursor-pointer items-center">
                    {item.imagePath && (
                      <AspectRatio ratio={4 / 3} className="m-3 bg-muted">
                        <Image
                          src={item.imagePath}
                          alt={item.title}
                          width={150}
                          className="h-full w-full rounded-md object-cover"
                          height={150}
                        />
                      </AspectRatio>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </MainSectionBody>
    </MainSection>
  );
}

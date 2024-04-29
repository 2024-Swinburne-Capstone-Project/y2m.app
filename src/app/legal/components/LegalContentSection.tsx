// components/LegalContentSection.tsx
'use client';
import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { TermsAndConditionsSection } from '@/types';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { LegalSectionCard } from './LegalSectionCard';

interface LegalContentSectionProps {
  sections: TermsAndConditionsSection[];
}

export const LegalContentSection: React.FC<LegalContentSectionProps> = ({ sections }) => {
  const plugin = React.useRef(Autoplay({ delay: 5000 }));

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      orientation="vertical"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.start}
      //margin top
      className="mt-20"
    >
      <CarouselContent className="-mt-1 h-[700px]">
        {sections.map((section, index) => (
          <CarouselItem key={index}>
              <LegalSectionCard section={section} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
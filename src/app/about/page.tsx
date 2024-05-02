import React from 'react';
import { ValuesSection } from '@/app/about/components/values-section';
import { AdditionalSection } from '@/app/about/components/additional-section';
import { aboutConfig } from '@/config/about';
import { HeroSection } from '@/app/about/components/hero-section';
import parseTextWithMarkup from '@/config/parser/parseTextWithMarkup';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        title={parseTextWithMarkup(aboutConfig.heroContent.title)}
        subtitle={parseTextWithMarkup(aboutConfig.heroContent.content)}
        imagePath={aboutConfig.heroContent.imagePath}
        imageAlt={aboutConfig.heroContent.title.text}
      />
      <AdditionalSection content={parseTextWithMarkup(aboutConfig.additionalContent.content)} />
      <ValuesSection
        title="Our Core Values"
        slides={aboutConfig.carouselSlides.map((slide) => ({
          ...slide,
          title: slide.title.text,
          content: slide.content.text,
        }))}
      />
    </div>
  );
}

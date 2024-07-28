import React from 'react';
import { ValuesSection } from '@/app/(marketing)/about/components/values-section';
import { AdditionalSection } from '@/app/(marketing)/about/components/additional-section';
import { aboutConfig } from '@/config/marketing/about';
import { HeroSection } from '@/app/(marketing)/about/components/hero-section';
import parseTextWithMarkup from '@/config/common/parser/parseTextWithMarkup';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        title={parseTextWithMarkup(aboutConfig.heroContent.title)}
        subtitle={parseTextWithMarkup(aboutConfig.heroContent.content)}
        imagePath={aboutConfig.heroContent.imagePath}
        imageAlt={aboutConfig.heroContent.title.text}
      />
      <AdditionalSection
        contentText={aboutConfig.additionalContent.content.text}
        linkText={aboutConfig.additionalContent.link.text}
        linkHref={aboutConfig.additionalContent.linkHref}
        suffixText={aboutConfig.additionalContent.suffix.text}
      />
      <ValuesSection title="Our Core Values" slides={aboutConfig.carouselSlides} />
    </div>
  );
}

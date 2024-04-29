import { aboutConfig } from '@/config/about';
import { HeroSection } from './components/hero-section';
import { AdditionalSection } from './components/additional-section';
import { ValuesSection } from './components/values-section';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        title={
          <>
            At You2Mentor, we believe that <span className="text-primary">everyone</span> should
            have the opportunity to access a mentor
          </>
        }
        subtitle={aboutConfig.heroContent.contentText}
        imagePath={aboutConfig.heroContent.imagePath}
        imageAlt={aboutConfig.heroContent.titleText}
      />
      <AdditionalSection content={aboutConfig.additionalContent.contentBody} />
      <ValuesSection title="Our Core Values" slides={aboutConfig.carouselSlides} />
    </div>
  );
}

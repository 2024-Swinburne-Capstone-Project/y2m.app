import HeroContent from '@/components/hero-content';
import HeroSection from '@/components/hero-section';
import HeroContentImage from '@/components/hero-content-image';
import HeroContentBody from '@/components/hero-content-body';
import { AboutCarousel } from './components/about-carousel';
import { aboutConfig } from '@/config/about';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        title={aboutConfig.heroSection.title}
        imagePath={aboutConfig.heroSection.imagePath}
        className="bg-secondary"
      />
      <HeroContent className="bg-gradient-to-b from-transparent to-secondary">
        <HeroContentBody titleText={aboutConfig.heroContent.titleText}>
          <p>{aboutConfig.heroContent.contentText}</p>
        </HeroContentBody>
        <HeroContentImage imagePath={aboutConfig.heroContent.imagePath} />
      </HeroContent>
      <HeroContent className="bg-secondary">
        <HeroContentBody>
          <blockquote className="mt-6 md:border-l-2 md:pl-6 italic text-justify">
            {aboutConfig.additionalContent.contentBody}
          </blockquote>
        </HeroContentBody>
      </HeroContent>
      <HeroContent className="bg-gradient-to-t from-transparent to-secondary">
        <AboutCarousel slides={aboutConfig.carouselSlides} />
      </HeroContent>
    </div>
  );
}

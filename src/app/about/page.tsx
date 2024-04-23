import HeroContent from "@/components/hero-content";
import HeroSection from "@/components/hero-section";
import HeroContentImage from "@/components/hero-content-image";
import HeroContentBody from "@/components/hero-content-body";
import { AboutCarousel } from "./components/about-carousel";
import { aboutConfig } from "@/config/about";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        title={aboutConfig.heroSection.title}
        imagePath={aboutConfig.heroSection.imagePath}
        className="bg-secondary"
      />
      <HeroContent>
        <HeroContentBody
          titleText={aboutConfig.heroContent.titleText}
          className="md:w-1/2">
          <p>{aboutConfig.heroContent.contentText}</p>
        </HeroContentBody>
        <HeroContentImage imagePath={aboutConfig.heroContent.imagePath} />
      </HeroContent>
      <HeroContent className="bg-secondary">
        <HeroContentBody className="md:w-full text-secondary-foreground">
          <p>{aboutConfig.additionalContent.contentBody}</p>
        </HeroContentBody>
      </HeroContent>
      <HeroContent>
        <AboutCarousel slides={aboutConfig.carouselSlides} />
      </HeroContent>
    </div>
  );
}

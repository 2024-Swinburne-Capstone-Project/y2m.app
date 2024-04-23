import HeroContent from "@/app/about/components/hero-content";
import HeroSection from "@/app/about/components/hero-section";
import HeroContentImage from "./components/hero-content-image";
import HeroContentBody from "./components/hero-content-body";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        title="About Us"
        imagePath="/about/about-us.jpg"
      />
      <HeroContent>
        <HeroContentBody
          titleText="At You2Mentor, we believe that everyone should have the opportunity to access a mentor"
          className="md:w-1/2">
          <p>
            With the goal of making mentorship accessible to all, You2Mentor was
            launched in December 2022 to be a dedicated online resource for
            personal growth. It provides users with the necessary tools and
            guidance to help them reach their potential.
          </p>
        </HeroContentBody>
        <HeroContentImage imagePath="/about/about-us.jpg" />
      </HeroContent>
      <HeroContent className="bg-secondary">
        <HeroContentBody className="md:w-full text-secondary-foreground">
          <p>
            According to Gallup, only 37% of individuals currently have access
            to at least one mentor. So we have created a platform for individual
            development where not only can you drive your growth, you can
            utilise a tribe of mentors based on development goals and mentor
            others utilising your strengths Signup to take the next step in your
            development journey
          </p>
        </HeroContentBody>
      </HeroContent>
    </div>
  );
}

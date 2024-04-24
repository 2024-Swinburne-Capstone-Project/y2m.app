import HeroContent from "@/components/hero-content";
import HeroContentBody from "@/components/hero-content-body";
import HeroContentImage from "@/components/hero-content-image";
import HeroSection from "@/components/hero-section";
import { enterpriseSolutionsConfig } from "@/config/enterprise-solutions";
import GetInTouch from "./components/get-in-touch";
import { Card } from "@/components/ui/card";

export default function EnterpriseSolutions() {
  return (
    <div>
      <HeroSection
        title={enterpriseSolutionsConfig.heroSection.title}
        imagePath={enterpriseSolutionsConfig.heroSection.imagePath}
        className="bg-secondary"
      />
      <HeroContent>
        <HeroContentBody
          titleText={enterpriseSolutionsConfig.heroContent.titleText}
          className="md:w-1/2"
        >
          <p>{enterpriseSolutionsConfig.heroContent.contentText}</p>
        </HeroContentBody>
        <HeroContentImage
          imagePath={enterpriseSolutionsConfig.heroContent.imagePath}
        />
      </HeroContent>
      <HeroContent className="bg-secondary">
        <HeroContentBody className="md:w-full text-secondary-foreground">
          <p>{enterpriseSolutionsConfig.additionalContent.contentBody}</p>
        </HeroContentBody>
      </HeroContent>
      <HeroContent>
        <HeroContentImage
          imagePath={enterpriseSolutionsConfig.additionalImagePath}
        />
        <Card className="w-[50vw] p-10">
          <GetInTouch />
        </Card>
      </HeroContent>
    </div>
  );
}

import HeroSection from "@/components/hero-section";
import HeroContent from "@/components/hero-content";
import HeroContentBody from "@/components/hero-content-body";
import HeroContentImage from "@/components/hero-content-image";
import { privacyPolicyConfig } from "@/config/legal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { Key } from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        title={privacyPolicyConfig.heroSection.title}
        imagePath={privacyPolicyConfig.heroSection.imagePath}
        className="bg-secondary"
      />
      {privacyPolicyConfig.sections.map((section, index) => (
        <HeroContent key={index} className={index % 2 === 0 ? "" : "bg-secondary"}>
          <HeroContentBody
            className={`md:w-1/2 ${
              index % 2 === 0 ? "" : "md:order-2 text-secondary-foreground"
            }`}
          >
            <Card>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {section.content.map((paragraph: string, paragraphIndex: Key | null | undefined) => (
                  <Typography key={paragraphIndex} variant="p">
                    {paragraph}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </HeroContentBody>
          {section.imagePath && 
          <HeroContentImage
            imagePath={section.imagePath}
            width={10000}
            height={7000}
            className={index % 2 === 0 ? "md:order-2" : ""}
          />}
        </HeroContent>
      ))}
    </div>
  );
}
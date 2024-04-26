'use client';
import { useState } from 'react';
import HeroSection from '@/components/hero-section';
import HeroContent from '@/components/hero-content';
import HeroContentBody from '@/components/hero-content-body';
import HeroContentImage from '@/components/hero-content-image';
import { privacyPolicyConfig, termsAndConditionsConfig } from '@/config/legal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Typography from '@/components/ui/typography';
import { Key } from 'react';
import { TermsAndConditionsSection } from '@/types';

export default function LegalPage() {
  const [isPrivacyPolicy, setIsPrivacyPolicy] = useState(true);

  const toggleConfig = (privacyPolicy: boolean) => {
    setIsPrivacyPolicy(privacyPolicy);
  };

  const config = isPrivacyPolicy ? privacyPolicyConfig : termsAndConditionsConfig;

  return (
      <div className="min-h-screen bg-background">
        <HeroSection
            title={config.heroSection.title}
            imagePath={config.heroSection.imagePath}
            className="bg-secondary"
        />
        <div className="flex justify-center items-center mt-8 mb-12">
          <button
              onClick={() => toggleConfig(true)}
              className={`px-6 py-2 rounded-l-full ${
                  isPrivacyPolicy
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary-hover"
              }`}
          >
            Privacy Policy
          </button>
          <button
              onClick={() => toggleConfig(false)}
              className={`px-6 py-2 rounded-r-full ${
                  !isPrivacyPolicy
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary-hover"
              }`}
          >
            Terms & Conditions
          </button>
        </div>
        {config.sections.map(
            (section: TermsAndConditionsSection, index: number) => (
                <HeroContent
                    key={index}
                    className={index % 2 === 0 ? "" : "bg-secondary"}
                >
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
                        {section.content.map(
                            (paragraph: string, paragraphIndex: Key) => (
                                <Typography key={paragraphIndex} variant="p">
                                  {paragraph}
                                </Typography>
                            )
                        )}
                      </CardContent>
                    </Card>
                  </HeroContentBody>
                  {section.imagePath && (
                      <HeroContentImage
                          imagePath={section.imagePath}
                          width={10000}
                          height={7000}
                          className={index % 2 === 0 ? "md:order-2" : ""}
                      />
                  )}
                </HeroContent>
            )
        )}
      </div>
  );
}

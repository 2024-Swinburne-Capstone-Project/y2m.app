'use client';
import { useState } from 'react';
import MainSection from '@/components/main-section';
import MainSectionBody from '@/components/main-section-body';
import MainSectionImage from '@/components/main-section-image';
import { privacyPolicyConfig, termsAndConditionsConfig } from '@/config/legal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Typography from '@/components/ui/typography';
import { Key } from 'react';
import { TermsAndConditionsSection } from '@/types';
import Image from 'next/image';
import Title from '@/components/title';

export default function LegalPage() {
  const [isPrivacyPolicy, setIsPrivacyPolicy] = useState(true);

  const toggleConfig = (privacyPolicy: boolean) => {
    setIsPrivacyPolicy(privacyPolicy);
  };

  const config = isPrivacyPolicy ? privacyPolicyConfig : termsAndConditionsConfig;

  return (
    <div className="min-h-screen bg-background">
      <MainSection>
        <MainSectionBody>
          <div className="md:w-1/2 space-y-6">
            <Title>{config.heroSection.title}</Title>
          </div>
          <div className="md:w-1/2">
            <Image
              src={config.heroSection.imagePath}
              alt={config.heroSection.title}
              width={300}
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>
        </MainSectionBody>
      </MainSection>
      <div className="flex justify-center items-center mt-8 mb-12">
        <button
          onClick={() => toggleConfig(true)}
          className={`px-6 py-2 rounded-l-full ${
            isPrivacyPolicy
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover'
          }`}
        >
          Privacy Policy
        </button>
        <button
          onClick={() => toggleConfig(false)}
          className={`px-6 py-2 rounded-r-full ${
            !isPrivacyPolicy
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover'
          }`}
        >
          Terms & Conditions
        </button>
      </div>
      {config.sections.map((section: TermsAndConditionsSection, index: number) => (
        <MainSection key={index} className={index % 2 === 0 ? '' : 'bg-secondary'}>
          <MainSectionBody
            className={`md:w-1/2 ${index % 2 === 0 ? '' : 'md:order-2 text-secondary-foreground '}`}
          >
            <Card>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {section.content.map((paragraph: string, paragraphIndex: Key) => (
                  <Typography key={paragraphIndex} variant="p">
                    {paragraph}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </MainSectionBody>
          {section.imagePath && (
            <MainSectionImage
              imagePath={section.imagePath}
              width={300}
              height={300}
              className={index % 2 === 0 ? 'md:order-2' : ''}
            />
          )}
        </MainSection>
      ))}
    </div>
  );
}

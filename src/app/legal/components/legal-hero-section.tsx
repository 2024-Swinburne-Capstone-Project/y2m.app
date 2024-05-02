import MainSection from '@/components/main-section';
import MainSectionBody from '@/components/main-section-body';
import Image from 'next/image';
import Title from '@/components/title';
import { PrivacyPolicyConfig, TermsAndConditionsConfig } from '@/types';

type LegalHeroSectionProps = PrivacyPolicyConfig | TermsAndConditionsConfig;

export const LegalHeroSection = ({ config }: { config: LegalHeroSectionProps }) => {
  return (
    <MainSection>
      <MainSectionBody className="space-y-6">
        <div className="space-y-6 md:w-1/2">
          <Title>{config.heroSection.title.text}</Title>
        </div>
        <div>
          <Image
            src={config.heroSection.imagePath}
            alt={config.heroSection.title.text}
            width={300}
            height={300}
            className="dark:rounded-full dark:bg-primary-foreground"
          />
        </div>
      </MainSectionBody>
    </MainSection>
  );
};

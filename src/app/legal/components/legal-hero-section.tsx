import MainSection from '@/components/main-section';
import MainSectionBody from '@/components/main-section-body';
import Image from 'next/image';
import Title from '@/components/title';

interface LegalHeroSectionProps {
  config: {
    heroSection: {
      title: string;
      imagePath: string;
    };
  };
}

export const LegalHeroSection: React.FC<LegalHeroSectionProps> = ({ config }) => {
  return (
    <MainSection>
      <MainSectionBody className="space-y-6">
        <div className="space-y-6 md:w-1/2">
          <Title>{config.heroSection.title}</Title>
        </div>
        <div>
          <Image
            src={config.heroSection.imagePath}
            alt={config.heroSection.title}
            width={300}
            height={300}
            className="dark:rounded-full dark:bg-primary-foreground"
          />
        </div>
      </MainSectionBody>
    </MainSection>
  );
};

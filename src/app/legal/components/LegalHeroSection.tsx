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
      <MainSectionBody>
        <Title>{config.heroSection.title}</Title>
        <div className="md:w-1/2">
          <Image
            src={config.heroSection.imagePath}
            alt={config.heroSection.title}
            width={250}
            height={250}
            className="w-full h-auto object-cover"
          />
        </div>
      </MainSectionBody>
    </MainSection>
  );
};
import MainSection from '@/components/main-section';
import MainSectionBody from '@/components/main-section-body';
import Image from 'next/image';
import Title from '@/components/title';
import Subtitle from '@/components/subtitle';

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  imagePath: string;
  imageAlt: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, imagePath, imageAlt }) => {
  return (
    <MainSection>
      <MainSectionBody className="space-y-6">
        <div className="md:w-1/2 space-y-6">
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </div>
        <div className="md:w-1/2 dark:bg-primary-foreground dark:rounded-full">
          <Image src={imagePath} alt={imageAlt} width={300} height={300} className="w-full h-auto object-cover" />
        </div>
      </MainSectionBody>
    </MainSection>
  );
};
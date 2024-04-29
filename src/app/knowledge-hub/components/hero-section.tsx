import MainSection from '@/components/main-section';
import MainSectionBody from '@/components/main-section-body';
import Image from 'next/image';
import Title from '@/components/title';

interface HeroSectionProps {
  title: string;
  imagePath: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ title, imagePath }) => {
  return (
    <MainSection>
      <MainSectionBody className="space-y-6">
        <div className="md:w-1/2 space-y-6">
          <Title>{title}</Title>
        </div>
        <div className="md:w-1/2 dark:bg-primary-foreground dark:rounded-full dark:overflow-hidden max-w-sm">
          <Image
            src={imagePath}
            alt={title}
            width={300}
            height={300}
            className="w-full h-auto object-cover"
          />
        </div>
      </MainSectionBody>
    </MainSection>
  );
};

import MainSection from '@/components/common/main-section';
import MainSectionBody from '@/components/common/main-section-body';
import Image from 'next/image';
import Title from '@/components/common/title';

interface HeroSectionProps {
  title: string;
  imagePath: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ title, imagePath }) => {
  return (
    <MainSection>
      <MainSectionBody className="space-y-6">
        <div className="space-y-6 md:w-1/2">
          <Title>{title}</Title>
        </div>
        <div className="max-w-sm dark:overflow-hidden dark:rounded-full dark:bg-foreground md:w-1/2">
          <Image
            src={imagePath}
            alt={title}
            width={300}
            height={300}
            className="h-auto w-full object-cover"
          />
        </div>
      </MainSectionBody>
    </MainSection>
  );
};

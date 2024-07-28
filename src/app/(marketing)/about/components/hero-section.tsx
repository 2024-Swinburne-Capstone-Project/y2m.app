import MainSection from '@/components/common/main-section';
import MainSectionBody from '@/components/common/main-section-body';
import Image from 'next/image';
import Title from '@/components/common/title';
import Subtitle from '@/components/common/subtitle';

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  imagePath: string;
  imageAlt: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  imagePath,
  imageAlt,
}) => {
  return (
    <MainSection>
      <MainSectionBody className="space-y-6">
        <div className="space-y-6 md:w-1/2">
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </div>
        <Image
          src={imagePath}
          alt={imageAlt}
          width={300}
          height={300}
          className="dark:rounded-full dark:bg-foreground md:w-1/2"
        />
      </MainSectionBody>
    </MainSection>
  );
};

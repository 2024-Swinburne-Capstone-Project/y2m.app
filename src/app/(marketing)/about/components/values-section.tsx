import MainSection from '@/components/common/main-section';
import Title from '@/components/common/title';
import { AboutCarousel } from './about-carousel';
import { AboutCarouselConfig } from '@/types';

interface ValuesSectionProps {
  title: string;
  slides: AboutCarouselConfig[];
}

export const ValuesSection: React.FC<ValuesSectionProps> = ({ title, slides }) => {
  return (
    <MainSection>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-12 md:px-8">
        <Title className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {title}
        </Title>
        <AboutCarousel slides={slides} />
      </div>
    </MainSection>
  );
};

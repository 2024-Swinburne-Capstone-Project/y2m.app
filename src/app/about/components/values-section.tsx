import MainSection from '@/components/main-section';
import Title from '@/components/title';
import { AboutCarousel } from './about-carousel';
import { AboutCarouselConfig } from '@/types';

interface ValuesSectionProps {
  title: string;
  slides: AboutCarouselConfig[];
}

export const ValuesSection: React.FC<ValuesSectionProps> = ({ title, slides }) => {
  return (
    <MainSection>
      <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto space-y-6">
        <Title className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{title}</Title>
        <AboutCarousel slides={slides} />
      </div>
    </MainSection>
  );
};
import MainSection from '@/components/main-section';
import MainSectionBody from '@/components/main-section-body';
import MainSectionImage from '@/components/main-section-image';
import { enterpriseSolutionsConfig } from '@/config/enterprise-solutions';
import GetInTouch from './components/get-in-touch';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Title from '@/components/title';
import Subtitle from '@/components/subtitle';

export default function EnterpriseSolutions() {
  return (
    <div className="min-h-screen bg-background">
      <MainSection>
        <MainSectionBody>
          <div className="md:w-1/2 space-y-6">
            <Title>{enterpriseSolutionsConfig.heroSection.title}</Title>
            <Subtitle>{enterpriseSolutionsConfig.heroContent.contentText}</Subtitle>
          </div>
          <div className="md:w-1/2">
            <Image
              src={enterpriseSolutionsConfig.heroContent.imagePath}
              alt={enterpriseSolutionsConfig.heroSection.title}
              width={300}
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>
        </MainSectionBody>
      </MainSection>
      <MainSection className="bg-secondary">
        <MainSectionBody className="md:w-full text-secondary-foreground">
          <p>{enterpriseSolutionsConfig.additionalContent.contentBody}</p>
        </MainSectionBody>
      </MainSection>
      <MainSection className="max-w-7xl mx-auto">
        <MainSectionImage imagePath={enterpriseSolutionsConfig.additionalImagePath} />
        <Card className="w-[50vw] p-10">
          <GetInTouch />
        </Card>
      </MainSection>
    </div>
  );
}

import MainSection from '@/components/main-section';
import MainSectionBody from '@/components/main-section-body';
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
        <MainSectionBody className="space-y-6">
          <div className="md:w-1/2 space-y-6">
            <Title>{enterpriseSolutionsConfig.heroContent.titleText}</Title>
            <Subtitle>{enterpriseSolutionsConfig.heroContent.contentText}</Subtitle>
          </div>
          <Image
            src={enterpriseSolutionsConfig.heroContent.imagePath}
            alt={enterpriseSolutionsConfig.heroContent.titleText}
            width={300}
            height={300}
            className="dark:bg-primary-foreground dark:rounded-full"
          />
        </MainSectionBody>
      </MainSection>
      <MainSection className="bg-secondary">
        <MainSectionBody className="md:w-full text-secondary-foreground max-w-7xl mx-auto">
          <p>{enterpriseSolutionsConfig.additionalContent.contentBody}</p>
        </MainSectionBody>
      </MainSection>
      <MainSection className="max-w-7xl mx-auto">
        <MainSectionBody className="space-y-6">
          <Image
            src={enterpriseSolutionsConfig.additionalImagePath}
            alt={enterpriseSolutionsConfig.heroContent.titleText}
            width={300}
            height={300}
            className="dark:bg-primary-foreground dark:rounded-full"
          />
          <Card className="md:w-[50vw] w-full m-1 p-5">
            <GetInTouch />
          </Card>
        </MainSectionBody>
      </MainSection>
    </div>
  );
}

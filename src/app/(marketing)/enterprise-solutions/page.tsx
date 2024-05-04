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
          <div className="space-y-6 md:w-1/2">
            <Title>{enterpriseSolutionsConfig.heroContent.title.text}</Title>
            <Subtitle>{enterpriseSolutionsConfig.heroContent.content.text}</Subtitle>
          </div>
          <Image
            src={enterpriseSolutionsConfig.heroContent.imagePath}
            alt={enterpriseSolutionsConfig.heroContent.title.text}
            width={300}
            height={300}
            className="dark:rounded-full dark:bg-foreground"
          />
        </MainSectionBody>
      </MainSection>
      <MainSection className="bg-secondary">
        <MainSectionBody className="mx-auto max-w-7xl text-secondary-foreground md:w-full">
          <p>{enterpriseSolutionsConfig.additionalContent.text}</p>
        </MainSectionBody>
      </MainSection>
      <MainSection className="mx-auto max-w-7xl">
        <MainSectionBody className="space-y-6">
          <Image
            src={enterpriseSolutionsConfig.additionalImagePath}
            alt={enterpriseSolutionsConfig.heroContent.title.text}
            width={300}
            height={300}
            className="dark:rounded-full dark:bg-foreground"
          />
          <Card className="m-1 w-full p-5 md:w-[50vw]">
            <GetInTouch />
          </Card>
        </MainSectionBody>
      </MainSection>
    </div>
  );
}

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getInTouchConfig } from '@/config/get-in-touch';
import MainSectionImage from '@/components/main-section-image';
import MainSectionBody from '@/components/main-section-body';

const PopularQuestions: React.FC = () => {
  return (
    <MainSectionBody className="space-y-8">
      <Card className="m-1 w-full p-5 md:w-[50vw]">
        <CardHeader>
          <CardTitle>Most Popular Questions</CardTitle>
        </CardHeader>
        <CardContent>
          {getInTouchConfig.popularQuestions.map((question, index) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem value={question.title}>
                <AccordionTrigger className="text-left">{question.title}</AccordionTrigger>
                <AccordionContent>{question.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </CardContent>
      </Card>
      <MainSectionImage width={450} imagePath={getInTouchConfig.accordionImage.imagePath} />
    </MainSectionBody>
  );
};

export default PopularQuestions;

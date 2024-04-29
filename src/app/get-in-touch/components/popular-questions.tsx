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

const PopularQuestions: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between w-2/3 mx-auto">
      <Card className="md:w-2/3 mb-8 md:mb-0">
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
    </section>
  );
};

export default PopularQuestions;

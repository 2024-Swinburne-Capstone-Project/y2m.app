import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getInTouchConfig } from '@/config/get-in-touch';
import HeroContentImage from '@/components/hero-content-image';

const PopularQuestions: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center py-12">
      <Card className="w-full md:w-3/5 mb-8 md:mb-0">
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
      <HeroContentImage imagePath={getInTouchConfig.accordionImage.imagePath} />
    </section>
  );
};

export default PopularQuestions;

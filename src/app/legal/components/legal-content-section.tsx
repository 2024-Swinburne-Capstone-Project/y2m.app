// components/LegalContentSection.tsx
'use client';
import * as React from 'react';
import { TermsAndConditionsSection } from '@/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';

interface LegalContentSectionProps {
  sections: TermsAndConditionsSection[];
}

export const LegalContentSection: React.FC<LegalContentSectionProps> = ({ sections }) => {
  return (
    <Accordion type="single" collapsible className="mt-20">
      {sections.map((section, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{section.title}</AccordionTrigger>
          <AccordionContent>
            {section.content.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex} className="mb-4">
                {paragraph}
              </p>
            ))}
            {section.imagePath && (
              <Image src={section.imagePath} alt={section.title} className="mt-4" />
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

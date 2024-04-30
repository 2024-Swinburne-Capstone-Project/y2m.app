'use client';
import React from 'react';
import { getInTouchConfig } from '@/config/get-in-touch';
import PopularQuestions from './components/popular-questions';
import ContactInfo from './components/contact-info';
import ContactForm from './components/contact-form';
import Image from 'next/image';
import Title from '@/components/title';
import MainSectionBody from '@/components/main-section-body';
import MainSection from '@/components/main-section';

export default function GetInTouchPage() {
  return (
    <div className="mb-16 mx-3">
      <MainSection>
        <MainSectionBody>
          <Title>{getInTouchConfig.heroSection.title}</Title>
          <Image
            src={getInTouchConfig.heroSection.imagePath}
            alt={getInTouchConfig.heroSection.title}
            width={300}
            height={300}
            className="dark:bg-primary-foreground dark:rounded-full"
          />
        </MainSectionBody>
      </MainSection>
      <PopularQuestions />
      <ContactInfo />
      <ContactForm />
    </div>
  );
}

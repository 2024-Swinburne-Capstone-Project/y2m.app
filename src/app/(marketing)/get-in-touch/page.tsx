'use client';
import React from 'react';
import { getInTouchConfig } from '@/config/marketing/get-in-touch';
import PopularQuestions from './components/popular-questions';
import ContactInfo from './components/contact-info';
import ContactForm from './components/contact-form';
import Image from 'next/image';
import Title from '@/components/common/title';
import MainSectionBody from '@/components/common/main-section-body';
import MainSection from '@/components/common/main-section';

export default function GetInTouchPage() {
  return (
    <div className="mx-3 mb-16">
      <MainSection>
        <MainSectionBody>
          <Title>{getInTouchConfig.heroSection.title.text}</Title>
          <Image
            src={getInTouchConfig.heroSection.imagePath}
            alt={getInTouchConfig.heroSection.title.text}
            width={300}
            height={300}
            className="dark:rounded-full dark:bg-foreground"
          />
        </MainSectionBody>
      </MainSection>
      <PopularQuestions />
      <ContactInfo />
      <ContactForm />
    </div>
  );
}

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
    <div className="min-h-screen bg-background mb-5">
      <MainSection>
        <MainSectionBody>
          <div className="md:w-1/2 space-y-6">
            <Title>{getInTouchConfig.heroSection.title}</Title>
          </div>
          <div className="md:w-1/2">
            <Image
              src={getInTouchConfig.heroSection.imagePath}
              alt={getInTouchConfig.heroSection.title}
              width={300}
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>
        </MainSectionBody>
      </MainSection>
      <div className="ml-5">
        <PopularQuestions />
      </div>
      <ContactInfo />
      <div className="md:w-2/3 m-auto">
        <ContactForm />
      </div>
    </div>
  );
}

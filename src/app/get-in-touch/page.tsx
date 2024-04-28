'use client';
import React from 'react';
import HeroSection from '@/components/hero-section';
import { getInTouchConfig } from '@/config/get-in-touch';
import PopularQuestions from './components/popular-questions';
import ContactInfo from './components/contact-info';
import ContactForm from './components/contact-form';

export default function GetInTouchPage() {
  return (
    <div className="min-h-screen bg-background mb-5">
      <HeroSection
        title={getInTouchConfig.heroSection.title}
        imagePath={getInTouchConfig.heroSection.imagePath}
        className="bg-secondary"
      />
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

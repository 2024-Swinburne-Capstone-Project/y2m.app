'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Features } from '@/components/features';
import { Testimonials } from '@/components/testimonials';
import Title from '@/components/title';
import Subtitle from '@/components/subtitle';
import MainSectionBody from '@/components/main-section-body';
import Image from 'next/image';
import RotatingWord from '@/components/rotating-word';
import MainSection from '@/components/main-section';
import { IntroVideo } from '@/components/intro-video';
import { Perks } from '@/components/perks';
import { MentorBenefits } from '@/components/mentor-benefits';
import { MenteeBenefits } from '@/components/mentee-benefits';
import { HomeBlogs } from '@/components/home-blogs';
import { AcknowledgementOfCountry } from '@/components/acknowledgement-of-country';

export default function Home() {
  const mainTitleWords = [
    'Unleash',
    'Discover',
    'Achieve',
    'Conquer',
    'Unlock',
    'Realize',
    'Fulfill',
    'Maximize',
  ];

  return (
    <div className="min-h-screen bg-background mb-6 mx-6">
      <AnimatePresence>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <MainSection>
            <MainSectionBody className="space-y-6 items-center">
              <div className="md:w-1/2 space-y-6">
                <Title className="lg:text-7xl">
                  <RotatingWord words={mainTitleWords} /> Your Potential!
                </Title>
                <Subtitle className="mb-8 text-lg text-muted-foreground md:text-xl">
                  A Platform for Peer to Peer Mentoring and Personal Development
                </Subtitle>
              </div>
              <div className="md:w-1/2 dark:bg-primary-foreground dark:rounded-full dark:overflow-hidden">
                <Image
                  src="/paper-plane.svg"
                  alt=""
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </div>
            </MainSectionBody>
          </MainSection>
        </motion.section>
        <div className="max-w-7xl mx-auto">
          <Perks />
          <IntroVideo />
          <Features />
          <MentorBenefits />
          <MenteeBenefits />
          <HomeBlogs />
          <Testimonials />
          <AcknowledgementOfCountry />
        </div>
      </AnimatePresence>
    </div>
  );
}
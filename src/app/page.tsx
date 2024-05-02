// pages/index.tsx
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
import { homeConfig } from '@/config/home';
import parseTextWithMarkup from '@/config/parser/parseTextWithMarkup';

export default function Home() {
  return (
    <div className="mx-6 mb-6 min-h-screen bg-background">
      <AnimatePresence>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <MainSection>
            <MainSectionBody className="items-center space-y-6">
              <div className="space-y-6 md:w-1/2">
                <Title className="lg:text-7xl">
                  <RotatingWord words={homeConfig.mainTitle.words.map((word) => word.text)} />{' '}
                  {parseTextWithMarkup(homeConfig.mainTitle.staticText)}
                </Title>
                <Subtitle className="mb-8 text-lg text-muted-foreground md:text-xl">
                  {parseTextWithMarkup(homeConfig.subtitle)}
                </Subtitle>
              </div>
              <div className="dark:overflow-hidden dark:rounded-full dark:bg-primary-foreground md:w-1/2">
                <Image
                  src={homeConfig.heroImage.src}
                  alt={homeConfig.heroImage.alt}
                  width={homeConfig.heroImage.width}
                  height={homeConfig.heroImage.height}
                  className="h-auto w-full object-cover"
                />
              </div>
            </MainSectionBody>
          </MainSection>
        </motion.section>
        <div className="mx-auto max-w-7xl">
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

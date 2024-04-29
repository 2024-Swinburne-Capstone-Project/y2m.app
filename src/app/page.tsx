'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Features } from '@/components/features';
import { Testimonials } from '@/components/testimonials';
import Title from '@/components/title';
import Subtitle from '@/components/subtitle';
import MainSection from '@/components/main-section';
import MainSectionBody from '@/components/main-section-body';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-background mb-6">
      <AnimatePresence>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <MainSection>
            <MainSectionBody>
              <div className="md:w-1/2 space-y-6">
                <Title className="lg:text-7xl">
                  <span className="text-primary">Unleash</span> Your Potential!
                </Title>
                <Subtitle className="mb-8 text-lg text-muted-foreground md:text-xl">
                  A Platform for Peer to Peer Mentoring and Personal Development
                </Subtitle>
              </div>
              <div  className="md:w-1/2 dark:bg-primary-foreground dark:rounded-full dark:overflow-hidden">
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
        <div className='max-w-7xl mx-auto'>
        <Features />
        <Testimonials />
        </div>
      </AnimatePresence>
    </div>
  );
}
